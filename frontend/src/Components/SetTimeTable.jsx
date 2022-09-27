import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import swal from "sweetalert";
import DoctorService from "../service/DoctorService";

function SetTimeTable() {
    const [timetable, setTimetable] = useState({
        ttId: "",
        doctor_id: {},
        weekday: "",
        startTime: "",
        endTime: "",
        slotDuration: "",
        breakTime: "",
        status: "",
        jwt: ""
    })
    useEffect(() => {
        const doctor = JSON.parse(sessionStorage.getItem("doctor"));
        setTimetable({ doctor_id: doctor.doctorId, jwt: doctor.jwt })

    }, []);
    const navigate = useNavigate();
    const logout = () => {
        sessionStorage.removeItem("doctor");
        navigate("/");
    }

    const changeHandler = (e) => {
        setTimetable((data) => ({
            ...data,
            [e.target.name]: e.target.value
        }));
        // console.log(e.target.name+" "+e.target.value)
    }
    const refreshPage = (e) => {
        window.location.reload();
    };


    const submitData = (e) => {
        e.preventDefault();

        const obj = {
            "doctorId": timetable.doctor_id,
            "timetables": [{
                "weekday": timetable.weekday, "startTime": timetable.startTime, "endTime": timetable.endTime,
                "breakTime": timetable.breakTime, "slotDuration": timetable.slotDuration
            }]
        }

        console.log(obj);

        swal({
            title: "Are you sure?",
            text: "Entered Records will get Saved !",
            icon: "info",
            buttons: true,
            dangerMode: true,
        })
            .then(() => {
                DoctorService.saveTimetable(obj, timetable.jwt)
                    .then(res => {
                        swal("Records Saved", {
                            icon: "success",
                        });
                        navigate(`/doctor`)
                    })
                    .catch(err => {
                        swal("Something Went Wrong", {
                            icon: "error",
                        });
                    })

            });

        return;

        DoctorService.saveTimetable(obj, timetable.jwt)
            .then(res => { alert("Success") })
            .catch(err => { alert("Error") })

        /*  axios.post(`http://localhost:8080/api/doctor/save_timetable`, obj)
         .then(res=>{alert("success"); navigate(`/doctor`)})
         .catch(err=>alert("Error")); */
    }



    return (
        <div className="container fluid" style={{ marginBottom: "50px" }}>
            <button className="btn btn-danger" onClick={logout} style={{ float: "right", marginTop: "10px", marginRight: "10px" }}>Logout</button>
            <button className='btn btn-secondary' style={{ float: "right", marginTop: "10px", marginRight: "10px" }} onClick={() => navigate("/doctor")}>Go Back</button>
            <br /><br />
            <h2>Set Time Table</h2>
            <form method="POST">

                <div style={{ marginTop: '10px' }} className="form-group">
                    <label><b>  Weekday: </b></label>
                    <p>{timetable.weekday}</p>
                    <input type="text" name="weekday" className="form-control"
                        value={timetable.weekday} onChange={changeHandler} />
                </div>
                <div style={{ marginTop: '10px' }} className="form-group">
                    <label><b>  Start Time: </b></label>
                    <input type="time" name="startTime" className="form-control"
                        value={timetable.startTime} onChange={changeHandler} />
                </div >
                <div style={{ marginTop: '10px' }} className="form-group">
                    <label><b>  End Time: </b></label>
                    <input type="time" name="endTime" className="form-control"
                        value={timetable.endTime} onChange={changeHandler} />
                </div >
                {/* <div style={{ marginTop: '10px' }} className = "form-group">
                    <label><b>  Slot Duration: </b></label>
                    <input type="number" min="1" max="60" name="slotDuration" className="form-control" 
                        value={timetable.slotDuration} onChange={changeHandler}/>
                </div > */}
                <div style={{ marginTop: '10px' }} className="form-group">
                    <label><b>  Break Time: </b></label>
                    <input type="time" placeholder={timetable.breakTime} name="breakTime" className="form-control"
                        value={timetable.breakTime} onChange={changeHandler} />
                </div >



                <div style={{ marginTop: "10px" }}>
                    <button className="btn btn-success" onClick={submitData}>Update</button>
                    <button type="button" className="btn btn-danger" style={{ marginLeft: "10px" }} onClick={refreshPage}>Reset</button>
                    <button className="btn btn-danger" onClick={() => navigate("/doctor")} style={{ marginLeft: "10px" }}>Cancel</button>


                </div>

            </form>
        </div>
    );
}
export default SetTimeTable;