import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table'
import axios from "axios";
import { IP_ADDRS } from "../service/Constant";
import swal from "sweetalert";
import PatientService from "../service/PatientService";

function SearchDoctor(){

    const [doctor,setDoctor]=useState([]);
    const [doctorList, setDoctorList] = useState([]);
    const [city,setCity]=useState([]);
    const [area,setArea]=useState([]);
    const [state,setState]=useState([]);
    const [stateId,setStateId] = useState("");
    const [cityId,setCityId] = useState("");
    const [areaId,setAreaId]=useState("");
    const [error,setError]=useState("");
    const navigate = useNavigate();

    useEffect(() => {  
        let patient = JSON.parse(sessionStorage.getItem("patient"));  
        PatientService.getDoctorList(patient.jwt)
        .then(res=>{let obj = JSON.stringify(res.data); sessionStorage.setItem("doctorList",obj);
            // console.log(obj);
            setDoctorList(res.data);
            if(res.data.length === 0)
            swal("No Doctors Found","","info");
        })
            
        .catch(err=>{swal("Failed to fetch Doctor List","","error")});
    },[]);

    const changeHandler = (e) => {
        setAreaId(e.target.value)
       // console.log(e.target.name+" "+e.target.value)
    }

    const refreshPage = (e) => {
        window.location.reload();
      };

    const cityFetch=(e)=>{
        setStateId(e.target.value);
        // console.log(stateId);
        const val=e.target.value;
        fetch("http://localhost:8080/getcitybystate/"+val)
        .then(r => r.json())
        .then(d => setCity(d));
    }

    const areaFetch=(e)=>{
    }

    const search=(ev)=>{
  
    }
    const [speciality,setSpeciality]=useState([]);
    const fetchSpeciality=()=>{
    }
    const [specId,setSpecId]=useState("");

    const setSpec=(ev)=>{
        setSpecId(ev.target.value);
    }


    const appointment=(ev)=>{
        sessionStorage.setItem("doctor",JSON.stringify(ev));
        navigate("/doctorappointment");
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
<br></br>            
<div>
                <h1 className="font-weight-bold">Search Doctor</h1>

                <div style={{ marginTop: '10px' }} className="form-group">
                    <label><b>  Select Area: </b></label>


                    <select style={{ marginLeft: '10px' }} name="state" onChange={cityFetch}>
                        <option value="">--state--</option>
                        {state.map((v) => {
                            return (
                                <option key={v.stateId} value={v.stateId}>{v.stateName}</option>
                            );
                        })}
                    </select>

                    <select style={{ marginLeft: '10px' }} name="city" onChange={areaFetch}>
                        <option value="">--city--</option>
                        {city.map((v) => {
                            return (
                                <option key={v.cityId} value={v.cityId}>{v.cityName}</option>
                            );
                        })}
                    </select>

                    <select style={{ marginLeft: '10px' }} name="areaId" onChange={changeHandler} onBlur={fetchSpeciality}>
                        <option value="">--area--</option>
                        {area.map((v) => {
                            return (
                                <option key={v.areaId} value={v.areaId}>{v.areaName}</option>
                            );
                        })}
                    </select>
                    <select style={{ marginLeft: '10px', marginTop: "10px" }} name="areaId" onChange={setSpec}>
                        <option value="0">--Speciality--</option>
                        {speciality.map((v) => {
                            return (
                                <option key={v} value={v}>{v}</option>
                            );
                        })}
                    </select>
                </div>


                <button className='btn btn-primary' style={{ marginLeft: "10px", marginTop: "10px" }} onClick={search}>Search</button>
                <button type="button" className="btn btn-danger" style={{ marginLeft: "10px", marginTop: "10px" }} onClick={refreshPage}>Reset</button>
                <button className="btn btn-danger" onClick={() => navigate("/patient")} style={{ marginLeft: "10px", marginTop: "10px" }}>Cancel</button>
            </div>
            <div>
            <p className="text text-danger"><b>{error}</b></p>  
            </div>
           
        
        </div>
        <div className="container my-4">
                <div>
                
                    <h3>Doctor List</h3>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-light">
                        <tr>
                        <th>Speaciality</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Gender</th>
                        <th>Graduation</th>
                        <th>Post Graduation</th>
                        <th>Fees</th>
                        <th>Area Name</th>
                        <th>City Name</th>
                        <th>State Name</th>
                        <th>Action</th>
                    </tr>
                        </thead>
                        <tbody>
                            {doctorList.map((v,i) => {
                        return (
                            <tr key={`dr_list${i}`}>
                                <td>{v.speciality[0].specialityType}</td>
                                <td>{v.firstName}</td>
                                <td>{v.lastName}</td>
                                <td>{v.gender}</td>
                                <td>{v.qualification[0].educationType}</td>
                                <td>{v.qualification[0].educationType}</td>
                                <td>{v.fees}</td>
                                <td>{v.address[0].town}</td>
                                <td>{v.address[0].city}</td>
                                <td>{v.address[0].state}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => appointment(v)}>Book Appointment</button>
                                </td>
                            </tr>
                        );
                            })}
                        </tbody>
                    </table>
                </div>
            </div></>
    )
}
export default SearchDoctor;
