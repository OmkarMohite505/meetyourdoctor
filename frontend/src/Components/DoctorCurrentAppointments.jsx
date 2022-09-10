import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table'
import axios from "axios";
import { IP_ADDRS } from "../service/Constant";

function DoctorCurrentAppointments() {
    const [doctorId, setDoctorId] = useState("");
    const [jwt, setJwt] = useState("");
    const [appointments, setAppointments] = useState([]);
    useEffect(() => {
        let doc = JSON.parse(sessionStorage.getItem("doctor"));
        setDoctorId(doc.doctorId);
        setJwt(doc.jwt);
    }, []);

    const currentappointments = () => {
        axios.get(`${IP_ADDRS}/api/doctor/get_appointment_list/${doctorId}`, { headers: { "Authorization": `Bearer ${jwt}` } })
            .then(res => {
                setAppointments(res.data);
                console.log(res.data)
            })
            .catch(err => console.log(err));
    }

    const navigate = useNavigate();

    const cancel = (ev) => {
        // console.log(ev);
        // console.log(ev.appointmentId+""+ ev.appointmentDate+""+ ev.appointmentTime+ev.appointmentType+ev.doctorId+ev.patientId);
        const reqOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                appointmentId: ev.appointmentId,
                appointmentDate: ev.appointmentDate,
                appointmentTime: ev.appointmentTime,
                appointmentType: ev.appointmentType,
                doctorId: ev.doctorId,
                patientId: ev.patientId,
                status: "cancelled",
                cancelledBy: "Doctor"
            })
        }
        fetch("http://localhost:8080/cancelappointment", reqOptions)
            .then(resp => resp.text())
            .then(data => {
                if (data.length != 0) {
                    alert("Appointment cancelled!");
                    navigate('/doctor');
                }
                else {
                    alert("Appointment cancel Failed!!!");
                    window.location.reload();
                }
            })
    }
    const closeCurrentAppointment = (a) => {
        sessionStorage.setItem("appt", JSON.stringify(a));
        navigate(`/close_appointment`);
    }
    const logout = () => {
        sessionStorage.removeItem("doctor");
        navigate("/");

    }
    return (
        <>
            {/* <div className="container-fluid">
            <button className="btn btn-primary" onClick={logout} style={{ float: "right", marginTop: "10px", marginRight: "10px" }}>Logout</button>
            <button className='btn btn-primary' style={{ float: "right", marginTop: "10px", marginRight: "10px" }} onClick={() => navigate("/doctor")}>Back to Dashboard</button>
            <button className='btn btn-primary' onClick={currentappointments}>Show Current Appointments</button>

            <div>
                <h1 className="font-weight-bold offset-4">Doctor Appointment List</h1>

                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Appointment Date</th>
                            <th>Appointment Time</th>
                            <th>Appointment Type</th>
                            <th>Appointment Status</th>
                            <th>Patient Id</th>
                            <th>Patient Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((v) => {
                            return (
                                <tr>
                                    <td>{v.appointmentDate}</td>
                                    <td>{v.appointmentTime}</td>
                                    <td>{v.appointmentType}</td>
                                    <td>{v.status}</td>
                                    <td>{v.patientId.patient_id}</td>
                                    <td>{v.patientId.firstName} {v.patientId.lastName}</td>

                                    <td>
                                        <button className="btn btn-primary" onClick={() => cancel(v)}>Cancel Appointment</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        </div> */}
            <div className="container my-4" style={{ marginBottom: "50px" }}>
                <button className="btn btn-danger" onClick={logout} style={{ float: "right", marginTop: "10px", marginRight: "10px" }}>Logout</button>
                <button className='btn btn-secondary' style={{ float: "right", marginTop: "10px", marginRight: "10px" }} onClick={() => navigate("/doctor")}>Go Back</button>
                <br /><br />
                <div>
                    <button className="btn btn-primary" onClick={currentappointments}>Show Current Appointments</button>
                    <h3>Doctor List</h3>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-light">
                            <tr>
                                <th>Appointment Date</th>
                                <th>Appointment Time</th>
                                <th>Payment Status</th>
                                <th>Appointment Status</th>
                                <th>Patient Id</th>
                                <th>Patient Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((v, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{v.appointmentDate}</td>
                                        <td><input type="time" value={v.appointmentTime} readOnly style={{ "border": "none" }}></input></td>
                                        <td>Available Soon</td>
                                        <td>{v.status}</td>
                                        <td>{v.patientId}</td>
                                        <td>{v.patientName}</td>

                                        <td>
                                            {/* <Link to={{pathname:`/close_appointment`, state:{appt:v}}}><button className="btn btn-warning">Close Appointment</button></Link> */}
                                            <button className="btn btn-primary" onClick={() => closeCurrentAppointment(v)}>Close Appointment</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
export default DoctorCurrentAppointments;