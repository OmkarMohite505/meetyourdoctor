import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import swal from "sweetalert";
import axios from "axios";
import PatientService from "../service/PatientService";
import { IP_ADDRS } from "../service/Constant";


const DoctorDetailsUnVerify = () => {

    const [timeslot, setTimeSlots] = useState([]);
    const [date, setDate] = useState("");
    const [empty, setEmpty] = useState([]);
    const [slot, setSlot] = useState([]);
    const [time, setTime] = useState("");
    const [speciality, setSpeciality] = useState([]);
    const [timetables, setTimetables] = useState([]);
    const navigate = useNavigate();

    const [doctor, setDoctor] = useState({});

    const [admin, setAdmin] = useState({});
    useEffect(() => {
        let doctor = JSON.parse(sessionStorage.getItem("verifiedDoctor"));
       
        let admin = JSON.parse(sessionStorage.getItem("admin"));
        setAdmin(admin);
       if(doctor === null){
        navigate(`/admin`);
       }
       else{
        setDoctor(doctor);
        setSpeciality(doctor.speciality);
        setTimetables(doctor.timetables);
       }
        // setUserData(doctor, patient);
    }, []);


    const unVerifyDoctor = () => {
        swal({
            title: "Are you Confirm to Un-Verify Doctor?",
            text: "Once un-verified he will not be able to take Appointment!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willCreate) => {
                if (willCreate) {
                    axios.get(`${IP_ADDRS}/api/admin/un_verify_doctor/${doctor.doctorId}`, { headers: { "Authorization": `Bearer ${admin.jwt}` } })
                        .then(res => {
                            console.log(res.data);
                            sessionStorage.removeItem("verifiedDoctor");
                            let list = JSON.parse(sessionStorage.getItem("verifiedDoctorList"));
                            let newList = list.filter(d => d.doctorId != doctor.doctorId);
                            console.log(newList);
                            if (newList)
                                sessionStorage.setItem("verifiedDoctorList", JSON.stringify(newList));
                            swal("Doctor Un-Verified", "success");
                            navigate(`/viewdoctor`)
                        })
                        .catch(err => { swal("Something Went Wrong", "error") });


                }
                else {

                }


            });
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
                                <tr key={`ss_li${i}`}>
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
                            {/* <th>Slots Available</th> */}
                            <th>Weekday/OFF</th>
                            {/* <th>Status</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {

                            timetables.map((t,i) => (
                                <tr key={`tt_li${i}`}>
                                    <td><input type="time" value={t.startTime} readOnly style={{ "border": "none" }}></input></td>
                                    <td><input type="time" value={t.endTime} readOnly style={{ "border": "none" }}></input></td>
                                    <td><input type="time" value={t.breakTime} readOnly style={{ "border": "none" }}></input></td>
                                    {/* <td>{t.slotDuration}</td> */}
                                    <td>{t.weekday}</td>
                                    {/* <td>{t.status}</td> */}
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>

            <div>
                <button className="btn btn-success" onClick={unVerifyDoctor}>Un-Verify </button>
            </div>
        </div>
    );

}
export default DoctorDetailsUnVerify;