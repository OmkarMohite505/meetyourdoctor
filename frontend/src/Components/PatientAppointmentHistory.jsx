import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table'
import axios from "axios";
import { IP_ADDRS } from "../service/Constant";
import swal from "sweetalert";

function PatientAppointmentHistory(){
    const [patientId,setPatientId]=useState("");
    const [jwt, setJwt] = useState("");
    const [appointments,setAppointments]=useState([]);
    useEffect(() => {
        
        let pat= JSON.parse(sessionStorage.getItem("patient"));
        setPatientId(pat.patientId);
        setJwt(pat.jwt);
    },[]);

    const currentappointments=()=>{
        axios.get(`${IP_ADDRS}/api/patient/get_all_closed_appointment/${patientId}`,{ headers: {"Authorization" : `Bearer ${jwt}`}})
        .then(res=>{
            setAppointments(res.data);
            // console.log(res.data);
            if(res.data.length === 0)
            swal("No Past Appointments","","info")
        })
        .catch(err=>{swal("Something Goes Wrong","","error")})
    }

    const navigate = useNavigate();

    const cancel=(ev)=>{
    }
    const logout=()=>{
        sessionStorage.removeItem("patient");
        navigate("/");
    }
    return(
        <>
      
        <div className="container my-4" style={{marginBottom : "50px"}}>
        <button className="btn btn-danger" onClick={logout} style={{float:"right",marginTop:"10px",marginRight:"10px"}}>Logout</button>
        <button  className='btn btn-secondary' style={{float:"right",marginTop:"10px",marginRight:"10px"}} onClick={() => navigate("/patient")}>Go Back</button> 
<br></br>                 <div>
                    <button className="btn btn-primary" onClick={currentappointments}>Show Closed/Past Appointments</button>
                    <h3>Patient Appointment List</h3>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-light">
                        <tr>
                            <th>Appointment Date</th>
                            <th>Appointment Time</th>
                            {/* <th>Appointment Type</th> */}
                            <th>Appointment Status</th>
                            <th>Doctor Name</th>
                            <th>Doctor Speciality</th>
                            {/* <th>Action</th> */}
                        </tr>
                        </thead>
                        <tbody>
                         {appointments.map((v) => {
                            return (
                                <tr>
                                    <td><input type="date" value={v.appointmentDate} readOnly style={{"border":"none"}}></input></td>
                                    <td><input type="time" value={v.appointmentTime} readOnly style={{"border":"none"}}></input></td>
                                    {/* <td>{v.appointmentType}</td> */}
                                    <td>{v.status}</td>
                                    <td>Dr. {v.doctor.firstName} {v.doctor.lastName}</td>
                                    <td>{v.doctor.speciality[0].specialityType}</td>

                                    <td>
                                        {/* <button className="btn btn-primary" onClick={() => cancel(v)}>Cancel Appointment</button> */}
                                    </td>
                                </tr>
                            );
                            })} 
                        </tbody>
                    </table>
                </div>
            </div></>
    );
}
export default PatientAppointmentHistory;