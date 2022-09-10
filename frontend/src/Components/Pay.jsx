import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import { useEffect } from "react";
import { IP_ADDRS } from "../service/Constant";
import swal from "sweetalert";

function Pay() {

    const [appointmentId,setappointmentId] = useState('');
    const [doctor, setDoctor] = useState({});
    const [patient, setPatient] = useState({});
    const navigate = useNavigate();

    useEffect(()=>{
        let doctor = JSON.parse(sessionStorage.getItem("doctor"));
        let patient = JSON.parse(sessionStorage.getItem("patient"));
        let apptId = JSON.parse(sessionStorage.getItem("appt"));
        setDoctor(doctor);
        setappointmentId(apptId.appointmentId);
        setPatient(patient);
    },[])

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
        let data = {"amount":doctor.fees, "patientId":patient.patientId,
                    "appointmentId":appointmentId};
                    console.log(data);
        const result = await axios.post(`${IP_ADDRS}/api/patient/appointment/pay/create_order`,data,{ headers: {"Authorization" : `Bearer ${patient.jwt}`}});

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        var { amount, id: order_id, currency } = result.data;
        amount = amount * 100;

        const options = {
            key: "rzp_test_avqPqvBNedSxPH", // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: "INR",
            name: "Donation",
            description: "Test Transaction",
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                    patientId:patient.patientId,
                    appointmentId:appointmentId
                }; 
                console.log(data);

                axios.post(`${IP_ADDRS}/api/patient/appointment/pay/update_order`, data ,{ headers: {"Authorization" : `Bearer ${patient.jwt}`}})
                .then(res=>{
                    // alert("Payment Success");
                    swal("Payment Success","You Appointment Booked, Details Sent, Redirecting to Profile Page","success");
                navigate(`/patient`);
                })
                .catch(err=>{alert("error")});

                // alert("Payment Success");
            },
            prefill: {
                name: "",
                email: "",
                contact: "",
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
        <div >
            <h1>Checkout to do Payement </h1>
             <label>Fees to Pay to Book Appoinment </label>
                <h3>Amount : {doctor.fees}</h3>
              &emsp;  <button className="btn btn-success btn-lg" onClick={displayRazorpay}>
                   Confirm 
                </button>
        </div>
    );
}

export default Pay;