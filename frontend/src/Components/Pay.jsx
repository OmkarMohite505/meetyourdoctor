import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { IP_ADDRS } from "../service/Constant";
import swal from "sweetalert";

function Pay() {

    const [appointmentId, setappointmentId] = useState('');
    const [doctor, setDoctor] = useState({});
    const [patient, setPatient] = useState({});
    const [doctorPic, setDoctorPic] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let doctor = JSON.parse(sessionStorage.getItem("doctor"));
        let patient = JSON.parse(sessionStorage.getItem("patient"));
        let apptId = JSON.parse(sessionStorage.getItem("appt"));
        setDoctor(doctor);
        setappointmentId(apptId.appointmentId);
        setPatient(patient);
        console.log(doctor.profilePicture.substring(15));
    }, [])
    useEffect(() => {
        
        // let doctor = JSON.parse(sessionStorage.getItem("doctor"));
        // axios.get(`${IP_ADDRS}/api/image/path/ROLE_DOCTOR/${doctor.profilePicture.substring(15)}`)
        //     .then(res => {
        //         setDoctorPic(res.data.image);
        //     })
    }, [doctor])

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async function displayRazorpay() {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }
        let data = {
            "amount": doctor.fees, "patientId": patient.patientId,
            "appointmentId": appointmentId
        };
        console.log(data);
        const result = await axios.post(`${IP_ADDRS}/api/patient/appointment/pay/create_order`, data, { headers: { "Authorization": `Bearer ${patient.jwt}` } });

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        var { amount, id: order_id, currency } = result.data;
        amount = amount * 100;

        const options = {
            key: "your_razorpay_key_id", // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: "INR",
            name: `Dr. ${doctor.firstName} ${doctor.lastName}`,
            description: "Appointment Fees of Doctor",
            order_id: order_id,
            // image: `data:image/jpg;base64,${doctorPic}`,
            image:`${IP_ADDRS}/api/image/ROLE_DOCTOR/${doctor.doctorId}`,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                    patientId: patient.patientId,
                    appointmentId: appointmentId
                };
                console.log(data);

                axios.post(`${IP_ADDRS}/api/patient/appointment/pay/update_order`, data, { headers: { "Authorization": `Bearer ${patient.jwt}` } })
                    .then(res => {
                        // alert("Payment Success");
                        swal("Payment Success", "You Appointment Booked, Details Sent, Redirecting to Profile Page", "success");
                        navigate(`/patient`);
                    })
                    .catch(err => { alert("error") });

                // alert("Payment Success");
            },
            prefill: {
                name: `${patient.firstName} ${patient.lastName}`,
                email: `${patient.email}`,
                contact: `${patient.mobileNumber}`,
            },
            notes: {
                address: "",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <div style={{ "marginLeft": "300px" }}>
            <h1>Checkout to do Payement </h1>
            <label>Fees to Pay to Book Appoinment </label>
            <h3>Amount : {doctor.fees}</h3>
            <h2>Dr. {doctor.firstName} &nbsp;{doctor.lastName}</h2>
            {/* <img src={`data:image/jpg;base64,${doctorPic}`} alt="" height="200px" width="200px" /> */}
            <div className="col-sm-3"><img src={`${IP_ADDRS}/api/image/ROLE_DOCTOR/${doctor.doctorId}`} style={{'height':'200px','width':'200px'}}></img></div>
            &emsp;<br />  <button className="btn btn-success btn-lg" onClick={displayRazorpay}>

                Confirm
            </button>
        </div>
    );
}

export default Pay;