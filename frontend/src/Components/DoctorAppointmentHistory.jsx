import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table'
import axios from "axios";
import { IP_ADDRS } from "../service/Constant";
import swal from "sweetalert";

function DoctorAppointmentHistory() {

    const [doctorId, setDoctorId] = useState("");
    const [appointments, setAppointments] = useState([]);
    const [token, setToken] = useState("");
    useEffect(() => {
        let doc = JSON.parse(sessionStorage.getItem("doctor"));
        setDoctorId(doc.doctorId);
        setToken(doc.jwt);
    }, []);

    const allAppointments = () => {
        axios.get(`${IP_ADDRS}/api/doctor/get_all_closed_appointment/${doctorId}`,
            { headers: { "Authorization": `Bearer ${token}` } })
            .then(res => {
                if (res.data.length === 0)
                    swal("No Appointment History Found", "", "info");
                setAppointments(res.data);
                // console.log(res.data);
            })
    }

    const navigate = useNavigate();

    const logout = () => {
        sessionStorage.removeItem("doctor");
        navigate("/");
    }
    return (
        <>

            <div className="container my-4" style={{ marginBottom: "50px" }}>
                <button className="btn btn-danger" onClick={logout} style={{ float: "right", marginTop: "10px", marginRight: "10px" }}>Logout</button>
                <button className='btn btn-secondary' style={{ float: "right", marginTop: "10px", marginRight: "10px" }} onClick={() => navigate("/doctor")}>Go Back</button>
                <br /><br />
                <div>
                    <button className="btn btn-primary" onClick={allAppointments}>Show All Appointment</button>
                    <h3>Doctor List</h3>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-light">
                            <tr>
                                <th>Appointment Date</th>
                                <th>Appointment Time</th>
                                {/* <th>Appointment Type</th> */}
                                <th>Appointment Status</th>
                                <th>Patient Id</th>
                                <th>Patient Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((v, i) => {
                                return (
                                    <tr key={`appt_li${i}`}>
                                        <td><input type="date" value={v.appointmentDate} disabled style={{ "border": "none" }}></input></td>
                                        <td><input type="time" value={v.appointmentTime} disabled style={{ "border": "none" }}></input></td>
                                        {/* <td>{v.appointmentType}</td> */}
                                        <td >{v.status}</td>
                                        {/* <td >success</td> */}
                                        <td>{v.patient.patientId}</td>
                                        <td>{v.patient.firstName} {v.patient.lastName}</td>

                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div></>
    );
}
export default DoctorAppointmentHistory;