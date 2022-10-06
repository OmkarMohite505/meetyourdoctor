import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table'
import axios from "axios";
import { IP_ADDRS } from "../service/Constant";
import swal from "sweetalert";
import PatientService from "../service/PatientService";

function SearchDoctor() {

    const [doctor, setDoctor] = useState([]);
    const [doctorList, setDoctorList] = useState([]);
    const [city, setCity] = useState("");
    const [area, setArea] = useState([]);
    const [state, setState] = useState("");
    const [stateId, setStateId] = useState(0);
    const [token, setToken] = useState("");
    const [areaId, setAreaId] = useState("");
    const [error, setError] = useState("");
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [speciality, setSpeciality] = useState([]);
    const [selectSpec, setSelectSpec] = useState("");
    const [tempDoctorList, setTempDoctorList] = useState([]);
    const [pincode, setPincode] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        let patient = JSON.parse(sessionStorage.getItem("patient"));
        setToken(patient.jwt);
    }, []);

    const specialityType = ["Select Speciality", "DERMATOLOGISTS", "CARDIOLOGISTS", "GENERAL_PHYSICIAN", "UROLOGISTS", "NEUROLOGISTS",
        "RHEUMATOLOGISTS", "RADIOLOGISTS", "PULMONOLOGISTS", "PSYCHIATRISTS",
        "PODIATRISTS", "PHYSIATRISTS", "PEDIATRICIANS", "PATHOLOGIST", "OTOLARYNGOLOGISTS",
        "OSTEOPATHS", "OPHTHALMOLOGISTS", "ONCOLOGISTS", "GYNECOLOGISTS",
        "NEPHROLOGISTS", "INTERNISTS", "HEMATOLOGISTS", "GASTROENTEROLOGISTS", "ENDOCRINOLOGISTS",
        "ANESTHESIOLOGISTS", "IMMUNOLOGISTS"

    ];
    useEffect(() => {
        axios.get(`https://cdn-api.co-vin.in/api/v2/admin/location/states`)
            .then(res => {
                let arr = [];
                let st = { "state_id": 0, "state_name": "Select State" };
                arr = res.data.states;
                arr.unshift(st);
                setStateList(arr);
            });

    }, []);
    useEffect(() => {
        if (stateId !== 0)
            axios.get(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateId}`)
                .then(res => {
                    let arr = [];

                    // let ct = { "district_id": 0, "district_name": "Select City" };
                    arr = res.data.districts;
                    // arr.unshift(ct);
                    setCityList(arr);
                });
    }, [stateId]);

    useEffect(() => {
        if(state !== "")
        axios.get(`${IP_ADDRS}/api/patient/get_all_doctors_list_by_state/${state}`,
            { headers: { "Authorization": `Bearer ${token}` } })
            .then(res => {
                // console.log(res.data);
                setDoctorList(res.data);
                // setTempDoctorList(res.data);
                if (res.data.length === 0)
                    swal("No Doctor Found for Selected State", "", "info");
            })
    }, [state]);

    useEffect(() => {
        if(city !== "")
        axios.get(`${IP_ADDRS}/api/patient/get_all_doctors_list_by_city/${city}`,
            { headers: { "Authorization": `Bearer ${token}` } })
            .then(res => {
                // console.log(res.data);
                setDoctorList(res.data);
                // setTempDoctorList(res.data);
                if (res.data.length === 0)
                    swal("No Doctor Found for Selected City", "", "info");
            })
    }, [city]);
    useEffect(() => {
        if(selectSpec !== "")
        axios.get(`${IP_ADDRS}/api/patient/get_all_doctors_list_by_speciality/${selectSpec}`,
            { headers: { "Authorization": `Bearer ${token}` } })
            .then(res => {
                // console.log(res.data);
                setDoctorList(res.data);
                // setTempDoctorList(res.data);
                if (res.data.length === 0)
                    swal("No Doctor Found for Selected Speciality", "", "info");
            })
    }, [selectSpec]);



    const changeHandler = (e) => {
       

        setPincode(e.target.value);
    }

    const getAllDoctorList=()=>{
        axios.get(`${IP_ADDRS}/api/patient/get_all_doctors_list`,
        { headers: { "Authorization": `Bearer ${token}` } })
        .then(res => {
            // console.log(res.data);
            setDoctorList(res.data);
            // setTempDoctorList(res.data);
            if (res.data.length === 0)
                swal("No Doctor Found for Entered Pincode", "", "info");
        })
    }
    const fetchDoctorListByPincode=()=>{
        if(pincode.length !== 6){
            swal("Enter Correct Pincode","","warning");
            return;
        }
        axios.get(`${IP_ADDRS}/api/patient/get_all_doctors_list_by_pincode/${pincode}`,
        { headers: { "Authorization": `Bearer ${token}` } })
        .then(res => {
            // console.log(res.data);
            setDoctorList(res.data);
            // setTempDoctorList(res.data);
            if (res.data.length === 0)
                swal("No Doctor Found for Entered Pincode", "", "info");
        })

    }

    const refreshPage = (e) => {
        window.location.reload();
    };

    const stateName = (e) => {
        let st_id = e.target.value;
        setStateId(st_id);
        var st = stateList.find(e => e.state_id == st_id);
        setState(st.state_name);
        // console.log(st.state_name);
    }

    const cityName = (e) => {
        // console.log(e.target.value);
        setCity(e.target.value);
    }

    const search = (ev) => {

    }

    const fetchSpeciality = () => {
    }


    const setSpec = (ev) => {
        console.log(ev.target.value);
        setSelectSpec(ev.target.value);
    }


    const appointment = (ev) => {
        sessionStorage.setItem("doctor", JSON.stringify(ev));
        navigate("/doctorappointment");
    }
    const logout = () => {
        sessionStorage.removeItem("patient");
        navigate("/");
    }

    return (
        <>
            <div className="container my-4" style={{ marginBottom: "50px" }}>
                <button className="btn btn-danger" onClick={logout} style={{ float: "right", marginTop: "10px", marginRight: "10px" }}>Logout</button>
                <button className='btn btn-secondary' style={{ float: "right", marginTop: "10px", marginRight: "10px" }} onClick={() => navigate("/patient")}>Go Back</button>
                <br></br>
                <div>
                    <h1 className="font-weight-bold">Search Doctor</h1>

                    <div style={{ marginTop: '10px' }} className="form-group">
                        <label><b>  Select Area: </b></label>


                        <select style={{ marginLeft: '10px' }} name="state" onChange={stateName}>
                            {/* <option value="">--state--</option> */}
                            {stateList.map((v, i) => {
                                return (
                                    <option key={`st_li_${i}`} value={v.state_id}>{v.state_name}</option>
                                );
                            })}
                        </select>&emsp;&emsp;

                        <select style={{ marginLeft: '10px' }} name="city" onChange={cityName}>
                            <option value="">Select City</option>
                            {cityList.map((v, i) => {
                                return (
                                    <option key={`dis_li_${i}`} value={v.district_name}>{v.district_name}</option>
                                );
                            })}
                        </select>

                        {/* <select style={{ marginLeft: '10px' }} name="areaId" onChange={changeHandler} onBlur={fetchSpeciality}>
                            <option value="">--area--</option>
                            {area.map((v) => {
                                return (
                                    <option key={v.areaId} value={v.areaId}>{v.areaName}</option>
                                );
                            })}
                        </select> */}&emsp;&emsp;
                        <input value={pincode} onChange={changeHandler} onBlur={fetchDoctorListByPincode} name="pincode" type="number" placeholder="Enter picode to serach doctor"></input>
                        &emsp;&emsp;
                        <select style={{ marginLeft: '10px', marginTop: "10px" }} name="areaId" onChange={setSpec}>
                            {/* <option value="0">--Speciality--</option> */}
                            {specialityType.map((v) => {
                                return (
                                    <option key={v} value={v}>{v}</option>
                                );
                            })}
                        </select><br /> <br />
                        <button onClick={getAllDoctorList}>Show All Doctors List</button>
                    </div>


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
                                {/* <th>Graduation</th> */}
                                {/* <th>Post Graduation</th> */}
                                <th>Fees</th>
                                <th>Area Name</th>
                                <th>City Name</th>
                                <th>State Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {doctorList.map((v, i) => {
                                return (
                                    <tr key={`dr_list${i}`}>
                                        <td>{v.speciality[0].specialityType}</td>
                                        <td>{v.firstName}</td>
                                        <td>{v.lastName}</td>
                                        <td>{v.gender}</td>
                                        {/* <td>{v.qualification[0].educationType}</td> */}
                                        {/* <td>{v.qualification[0].educationType}</td> */}
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
