import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import swal from "sweetalert";
import axios from "axios";
import PatientService from "../service/PatientService";
import { IP_ADDRS } from "../service/Constant";


function DoctorAppointmentSlot() {

    const [timeslot, setTimeSlots] = useState([]);
    const [date, setDate] = useState("");
    const [empty, setEmpty] = useState([]);
    const [slot, setSlot] = useState([]);
    const [time, setTime] = useState("");
    const [speciality, setSpeciality] = useState([]);
    const [timetables, setTimetables] = useState([]);

    const [doctor, setDoctor] = useState({});

    const [patient, setPatient] = useState({});
    useEffect(() => {
        let doctor = JSON.parse(sessionStorage.getItem("doctor"));
        setDoctor(doctor);
        let patient = JSON.parse(sessionStorage.getItem("patient"));
        setPatient(patient);
        setSpeciality(doctor.speciality);
        setTimetables(doctor.timetables);
        // setUserData(doctor, patient);
        // console.log(date);
        // console.log(time);
    }, []);


    const bookAppointment = () => {
        if(date.length===0 && time.length===0){
            swal("Select Date and Time","","warning");
            return;
        }
        swal({
            title: "Are you Confirm to Book Appointment?",
            text: "Your Appontment Will book with selected doctor!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willCreate) => {
                if (willCreate) {
                    const obj = {
                        "appointmentDate": date, "appointmentTime": time,
                        "patientId": patient.patientId,
                        "doctorId": doctor.doctorId
                    }
                    console.log(obj);
                    // PatientService.bookAppointment(obj, patient.jwt)
                    axios.post(`${IP_ADDRS}/api/patient/appointment`, obj, { headers: { "Authorization": `Bearer ${patient.jwt}` } })
                        .then(res => {
                            console.log(res.data);
                            swal("Appointment Created", "You are now Redirected to Payment Page to Complent Appointment Booking", "success");
                            sessionStorage.setItem("appt", JSON.stringify(res.data));
                            navigate(`/pay`)
                        })
                        .catch(err => { console.log(err) });


                }
                else {

                }


            });
    }

    const appointments = (e) => {
    }

    const minDate = () => {

    }

    const maxDate = () => {

    }
    const navigate = useNavigate();

    const getTimeSlots = () => {


    }
    const book = (e) => {


    }
    const logout = () => {
        sessionStorage.removeItem("patient");
        navigate("/");
    }


    return (
        <div className="container-fluid" style={{ marginBottom: "50px" }}>
            <button className="btn btn-danger" onClick={logout} style={{ float: "right", marginTop: "10px", marginRight: "10px" }}>Logout</button>
            <button className='btn btn-secondary' style={{ float: "right", marginTop: "10px", marginRight: "10px" }} onClick={() => navigate("/patient")}>Go Back</button>
            <br /><br />


           
            <div>
                <h1>Dr. {doctor.firstName} {doctor.lastName}</h1>
                <h3>Mobile No : {doctor.mobileNumber}</h3>
                <h3>Email Id : {doctor.email}</h3>
                <Table className="table table-bordered">
                    <thead className="bg-dark text-light">
                        <tr>
                            <th>Speciality</th>
                            <th>Services Provides</th>
                            <th>Description</th>
                            <th>Photo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {


                            speciality.map((s,i) => (
                                <tr key={`dr_sp${i}`}>
                                    <td>{s.specialityType}</td>
                                    <td>{s.servicesProvided}</td>
                                    <td><details>
                                        <summary>Click here to read</summary>
                                        <p>{s.specialityDescription}</p>
                                    </details>
                                    </td>
                                    <td><img src="" /></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
                <h2>Doctor Schedule</h2>
                <Table className="table table-bordered">
                    <thead className="bg-dark text-light">
                        <tr>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Break Time</th>
                            <th>Weekday/OFF</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            timetables.map((t,i) => (
                                <tr key={`dr_tt${i}`}>
                                    <td><input type="time" value={t.startTime} readOnly style={{ "border": "none" }}></input></td>
                                    <td><input type="time" value={t.endTime} readOnly style={{ "border": "none" }}></input></td>
                                    <td><input type="time" value={t.breakTime} readOnly style={{ "border": "none" }}></input></td>
                                    <td>{t.weekday}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>

            <div style={{"marginLeft":"100px"}}>
                <label htmlFor="">Select date &emsp;</label><input type="date" name="date" id="" onChange={e => setDate(e.target.value)} min="2022-08-30" required /><br /><br />
                <label htmlFor="">Select Time &emsp;</label><input type="time" name="time" id="" onChange={e => setTime(e.target.value)} required /><br /><br /><br />
                <button className="btn btn-success" onClick={bookAppointment}>Book Appointment</button>
            </div>
        </div>
    );

}
export default DoctorAppointmentSlot;