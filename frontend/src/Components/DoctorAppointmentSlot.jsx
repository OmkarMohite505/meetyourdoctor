import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import swal from "sweetalert";
import axios from "axios";
import PatientService from "../service/PatientService";
import { IP_ADDRS } from "../service/Constant";


function DoctorAppointmentSlot(){

    const [timeslot, setTimeSlots]=useState([]);
    const [date, setDate]=useState("");
    const [empty, setEmpty]=useState([]);
    const [slot,setSlot]=useState([]);
    const [time, setTime] = useState("");
    const [speciality, setSpeciality] = useState([]);
    const [timetables, setTimetables] = useState([]);

    // const [data,setData]=useState({
    //     appointmentDate:"",
    //     appointmentTime:"",
    //     doctor_id:"",
    //     patient_id:""
    // })
    const [doctor,setDoctor]=useState({});

    const [patient,setPatient]=useState({});
    useEffect(() => {    
        let doctor= JSON.parse(sessionStorage.getItem("doctor"));
        setDoctor(doctor);
        let patient = JSON.parse(sessionStorage.getItem("patient"));
        setPatient(patient);
        setSpeciality(doctor.speciality);
        setTimetables(doctor.timetables);
        // setUserData(doctor, patient);
    },[]);


    const bookAppointment=()=>{
        swal({
            title: "Are you Confirm to Book Appointment?",
            text: "Your Appontment Will book with selected doctor!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willCreate) => {
            if(willCreate){
                const obj = {"appointmentDate":date,"appointmentTime":time,
                             "patientId":patient.patientId,
                             "doctorId":doctor.doctorId}
                             console.log(obj);
                // PatientService.bookAppointment(obj, patient.jwt)
                axios.post(`${IP_ADDRS}/api/patient/appointment`,obj ,{ headers: {"Authorization" : `Bearer ${patient.jwt}`}})
                .then(res=>{console.log(res.data);
                        swal("Appointment Created","You are now Redirected to Payment Page to Complent Appointment Booking", "success");
                        sessionStorage.setItem("appt",JSON.stringify(res.data));
                            navigate(`/pay`)})
                .catch(err=>{console.log(err)});


            }
            else{

            }
            
           
          });
    }

    const appointments=(e)=>{
        var today,dd,mm,yyyy;
        today = new Date();
        mm=today.getMonth()+1;
        if(mm<10){
            mm=0+""+mm;
        }
        yyyy=today.getFullYear();
        setDate(e.target.value);
        // console.log("dd-"+mm+"-"+yyyy);
        if(e.target.value === "dd-"+mm+"-"+yyyy){
            setEmpty("Please select valid date!!!")
        }
        else{
            fetch("http://localhost:8080/getappointments/"+doctor.doctorId+"/"+e.target.value)
            .then(r => r.json())
            .then(d => {/*console.log(d);*/setTimeSlots(d)}
            );
        }
}

const minDate=()=>{
    var today,dd,mm,yyyy;
    today = new Date();
    dd=today.getDate()+1;
    if(dd<10){
        dd=0+""+dd;
    }
    mm=today.getMonth()+1;
    if(mm<10){
        mm=0+""+mm;
    }
    yyyy=today.getFullYear();
    return yyyy+"-"+mm+"-"+dd;

}

const maxDate=()=>{
    var today,dd,mm,yyyy;
    today = new Date();
    dd=today.getDate()+14;
    if(dd<10){
        dd=0+""+dd;
    }
    mm=today.getMonth()+1;
    if(mm<10){
        mm=0+""+mm;
    }
    yyyy=today.getFullYear();
    return yyyy+"-"+mm+"-"+dd;
    
}
    const navigate =useNavigate();

    const getTimeSlots=()=>{

            if(timeslot.length==0){
                setEmpty("Doctor Appointments not available for current selection!");
                setSlot([]);
            }else{
                setEmpty("");
                setSlot(timeslot);
                // setEmpty(time);
            }
        

    }
    const book=(e)=>{

        // console.log(doctor);
        // console.log(patient);

        const reqOptions ={
            method : 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body : JSON.stringify({
                appointmentDate : date,
		        appointmentTime : e,
                appointmentType:"walk-in",
		        doctorId : doctor,
		        patientId : patient,
                status:"scheduled"
            })
        }
        fetch("http://localhost:8080/saveappointment",reqOptions)
        .then(resp=>resp.text())
        .then(data=> {if(data.length != 0)
            {
                alert("Appointment Booked!");
                navigate('/patient');
            }
            else{
                alert("Appointment Failed!!!");
                window.location.reload();
            }
        })

    }
    const logout=()=>{
        sessionStorage.removeItem("patient");
        navigate("/");
    }


    return(
        <div className="container-fluid" style={{marginBottom : "50px"}}>
          <button className="btn btn-danger" onClick={logout} style={{float:"right",marginTop:"10px",marginRight:"10px"}}>Logout</button>
        <button  className='btn btn-secondary' style={{float:"right",marginTop:"10px",marginRight:"10px"}} onClick={() => navigate("/patient")}>Go Back</button> 
    <br/><br/>
            <h2 className="font-weight-bold offset-4">Select Day</h2>
            <label><b>Select a Date :</b></label>

            <input type="date" onChange={appointments} min={minDate()} max={maxDate()} name="date" />

             <button  className='btn btn-primary' style={{marginLeft:"10px"}} onClick={getTimeSlots}>View Time Slots</button>
             <h1 className="font-weight-bold offset-4">Available Appointments</h1>
               
                <p className="text text-danger offset-4"><b>{empty}</b></p>
                
            <Table className="table table-bordered" >
            <thead className="bg-dark text-light">
                 <tr>
                    <th>Slot</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
        {
            slot.map((v)=>{
                return (
            <tr>
                <td>{v}</td>
                <td>
                <button className="btn btn-primary" onClick={()=>book(v)}  >Book Appointment</button>
                </td>
            </tr>
            )})
            
        }
            </tbody>
        </Table>
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
                
                
                speciality.map((s)=>(
                    <tr>
                        <td>{s.specialityType}</td>
                        <td>{s.servicesProvided}</td>
                        <td><details>
                                    <summary>Click here to read</summary>
                                    <p>{s.specialityDescription}</p>
                            </details>
                        </td>
                        <td><img src=""/></td>
                    </tr>
                ))
            } 
             </tbody>
            </Table>
            <h2>Doctor Schedule</h2>
            <Table  className="table table-bordered">
            <thead className="bg-dark text-light">
                 <tr>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Break Time</th>
                    <th>Slots Available</th>
                    <th>Weekday/OFF</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {
                
                    timetables.map((t)=>(
                        <tr>
                            <td><input type="time" value={t.startTime} readOnly style={{"border":"none"}}></input></td>
                            <td><input type="time" value={t.endTime} readOnly style={{"border":"none"}}></input></td>
                            <td><input type="time" value={t.breakTime} readOnly style={{"border":"none"}}></input></td>
                            <td>{t.slotDuration}</td>
                            <td>{t.weekday}</td>
                            <td>{t.status}</td>
                        </tr>
                    ))
                } 
            </tbody>
            </Table>
        </div>
        
        <div>
            <label htmlFor="">Select date</label><input type="date" name="date" id="" onChange={e=>setDate(e.target.value)}/><br />
            <label htmlFor="">Select Time</label><input type="time" name="time" id="" onChange={e=>setTime(e.target.value)} /><br />
            <button className="btn btn-success" onClick={bookAppointment}>Book Appointment</button>
        </div>
        </div>
    );

}
export default DoctorAppointmentSlot;