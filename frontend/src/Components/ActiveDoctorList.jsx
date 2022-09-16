import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { IP_ADDRS } from "../service/Constant";
import PatientService from "../service/PatientService";


const ActiveDoctorList = () => {
    const [doctorList, setDoctorList] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        // let admin = JSON.parse(sessionStorage.getItem("admin"));
        // axios.get(`${IP_ADDRS}/api/admin/un_verified_doctors_list`, { headers: { "Authorization": `Bearer ${admin.jwt}` } })
        //     .then(res => {
        //         console.log(res.data);
        //         setDoctorList(res.data);
        //         sessionStorage.setItem("verifyDoctorList", JSON.stringify(res.data));
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         swal("Something went Wrong", "", "error")
        //     })
        let doctorList = JSON.parse(sessionStorage.getItem("activeDoctorList"));
        if(doctorList)
        setDoctorList(doctorList);

    }, []);

    const getActiveDoctorList=()=>{
        let admin = JSON.parse(sessionStorage.getItem("admin"));
        axios.get(`${IP_ADDRS}/api/admin/active_doctors_list`, { headers: { "Authorization": `Bearer ${admin.jwt}` } })
            .then(res => {
                console.log(res.data);
                setDoctorList(res.data);
                sessionStorage.setItem("activeDoctorList", JSON.stringify(res.data));
            })
            .catch(err => {
                console.log(err);
                swal("Something went Wrong", "", "error")
            })
    }

    const details = (d) => {
        sessionStorage.setItem("suspendDoctor", JSON.stringify(d));
        navigate(`/suspend_doctor`);
    }

    return (
        <>
            <div className="container my-4">
                <div>
                    <button onClick={getActiveDoctorList}>Get Active Doctor List</button>
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
                            {doctorList.map((v) => {
                                return (
                                    <tr>
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
                                            <button className="btn btn-primary" onClick={() => details(v)}>Suspend</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
export default ActiveDoctorList;