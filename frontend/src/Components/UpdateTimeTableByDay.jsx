import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IP_ADDRS } from "../service/Constant";
import swal from "sweetalert";

function UpdateTimeTableByDay(){
    const [timetable,setTimetable]=useState({
        ttId: "",
        doctor_id: {},
        weekday:"",
        startTime: "",
        endTime: "",
        slotDuration: "",
        breakTime: "",
        status:"",
        token:""
    })
    useEffect(() => {
        const tt= JSON.parse(sessionStorage.getItem("daytimetable"));
        const doc = JSON.parse(sessionStorage.getItem("doctor"));
        setTimetable({ttId:tt.timeTableId,doctor_id:doc.doctorId,weekday:tt.weekday,
            startTime:tt.startTime,endTime:tt.endTime,slotDuration:tt.slotDuration,
            breakTime:tt.breakTime,status:tt.status,token:doc.jwt})
        
    },[]);
    const navigate=useNavigate();
    const logout=()=>{
        sessionStorage.removeItem("doctor");
        navigate("/");
    }
    
    const changeHandler = (e) => {
        setTimetable((data)=>({
            ...data,
            [e.target.name]:e.target.value
        }));
        // console.log(e.target.name+" "+e.target.value)
    }
    const refreshPage = (e) => {
        window.location.reload();
      };

      
      const submitData=(e)=>{
        e.preventDefault();

        const obj = {
            "doctorId": timetable.doctor_id,
            "timeTableId": timetable.ttId,
            "weekday": timetable.weekday,
            "startTime": timetable.startTime,
            "endTime": timetable.endTime,
            // "slotDuration": timetable.slotDuration,
            "breakTime": timetable.breakTime,
            "status": timetable.status}
            
        
        axios.post(`${IP_ADDRS}/api/doctor/update_timetable`, obj,{ headers: {"Authorization" : `Bearer ${timetable.token}`}})
        .then(res=>{
            swal("Updated","","success")
            navigate(`/updatetimetable`)
        })
        .catch(err=>{
            swal("Something Went Wrong","","error")
        });

    }



    return(
        <div  className="container fluid" style={{marginBottom : "50px"}}>
            <button className="btn btn-danger" onClick={logout} style={{float:"right",marginTop:"10px",marginRight:"10px"}}>Logout</button>
        <button  className='btn btn-secondary' style={{float:"right",marginTop:"10px",marginRight:"10px"}} onClick={() => navigate("/doctor")}>Go Back</button> 
    <br/><br/>
            <h2>Update Time Table</h2>
            <form method="POST">

                <div style={{ marginTop: '10px' }} className = "form-group">
                    <label><b>  Weekday: </b></label>
                    <p>{timetable.weekday}</p>
                    <input type="text" placeholder={timetable.weekday} onChange={changeHandler}  name="weekday" className="form-control" 
                        value={timetable.weekday} />
                </div>
                <div style={{ marginTop: '10px' }} className = "form-group">
                    <label><b>  Start Time: </b></label>
                    <input type="time" placeholder={timetable.startTime} name="startTime" className="form-control" 
                        value={timetable.startTime} onChange={changeHandler}/>
                </div >
                <div style={{ marginTop: '10px' }} className = "form-group">
                    <label><b>  End Time: </b></label>
                    <input type="time" placeholder={timetable.endTime} name="endTime" className="form-control" 
                        value={timetable.endTime} onChange={changeHandler}/>
                </div >
                {/* <div style={{ marginTop: '10px' }} className = "form-group">
                    <label><b>  Slot Duration: </b></label>
                    <input type="text" placeholder={timetable.slotDuration} name="slotDuration" className="form-control" 
                        value={timetable.slotDuration} onChange={changeHandler}/>
                </div > */}
                <div style={{ marginTop: '10px' }} className = "form-group">
                    <label><b>  Break Time: </b></label>
                    <input type="time" placeholder={timetable.breakTime} name="breakTime" className="form-control" 
                        value={timetable.breakTime} onChange={changeHandler}/>
                </div >
                


                <div style={{marginTop: "10px"}}>
                <button className="btn btn-success" onClick={submitData}>Update</button>
                <button type="button" className="btn btn-danger" style={{marginLeft: "10px"}} onClick={refreshPage}>Reset</button>
                <button className="btn btn-danger" onClick={() => navigate("/doctor")} style={{marginLeft: "10px"}}>Cancel</button>


                </div>

                </form>
        </div>
    );
}
export default UpdateTimeTableByDay;