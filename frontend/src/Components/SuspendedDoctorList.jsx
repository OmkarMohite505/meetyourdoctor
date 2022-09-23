import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { IP_ADDRS } from "../service/Constant";
import PatientService from "../service/PatientService";


const SuspendedDoctorList = () => {
    const [doctorList, setDoctorList] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        let doctorList = JSON.parse(sessionStorage.getItem("suspendedDoctorList"));
        if (doctorList)
            setDoctorList(doctorList);

    }, []);

    const getActiveDoctorList = () => {
        let admin = JSON.parse(sessionStorage.getItem("admin"));
        axios.get(`${IP_ADDRS}/api/admin/suspended_doctors_list`, { headers: { "Authorization": `Bearer ${admin.jwt}` } })
            .then(res => {
                if (res.data.length === 0)
                    swal("No any Suspended Doctor Currently","","info");
                    setDoctorList(res.data);
                sessionStorage.setItem("suspendedDoctorList", JSON.stringify(res.data));
            })
            .catch(err => {
                // console.log(err);
                swal("Something went Wrong", "", "error")
            })
    }

    const details = (d) => {
        sessionStorage.setItem("removeSuspensionDoctor", JSON.stringify(d));
        navigate(`/remove_suspended_doctor`);
    }

    return (
        <>
            <div className="container my-4">
                <div>
                    <button onClick={getActiveDoctorList}>Get Suspended Doctor List</button>
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
                                    <tr key={`sus_list${i}`}>
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
                                            <button className="btn btn-primary" onClick={() => details(v)}>Remove Suspension</button>
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
export default SuspendedDoctorList;