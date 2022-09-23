import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table'
import { NavLink } from "react-router-dom";
import axios from "axios";
import { IP_ADDRS } from "../service/Constant";
import swal from "sweetalert";

function AdminViewPatient() {

    const [patient, setPatient] = useState([]);
    const [token, setToken]  = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        let admin = JSON.parse(sessionStorage.getItem("admin"));
        setToken(admin.jwt);
       
    }, []);

    const logout = () => {
        sessionStorage.removeItem("admin");
        navigate("/");
    }

    const getAllPatientList = () => {
        axios.get(`${IP_ADDRS}/api/admin/get_all_patients_list`, { headers: { "Authorization": `Bearer ${token}`} })
        .then(res => {
            if(res.data.length===0)
            swal("No any Patient Registered yet!!","","info");
            setPatient(res.data);
        })
    }

    const activate = (ev) => {

    }


    return (
        <>
           

            <div className="container my-4" style={{ marginBottom: "50px" }}>
                <button className="btn btn-danger" onClick={logout} style={{ float: "right", marginTop: "10px", marginRight: "10px" }}>Logout</button>
                <button className='btn btn-secondary' style={{ float: "right", marginTop: "10px", marginRight: "10px" }} onClick={() => navigate("/admin")}>Go Back</button>
                <br /><br />                <div>
                    <button onClick={getAllPatientList}>Get All Patient List</button>
                    <h3>Patient List</h3>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-light">
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Mobile Number</th>
                                <th>Gender</th>
                                <th>Date Of Birth</th>
                                <th>Blood Group</th>

                            </tr>
                        </thead>
                        <tbody>
                            {patient.map((v, i) => {
                                return (
                                    <tr key={`pt${i}`}>
                                        <td>{v.firstName}</td>
                                        <td>{v.lastName}</td>
                                        <td>{v.mobileNumber}</td>
                                        <td>{v.gender}</td>
                                        <td>{v.dob}</td>
                                        <td>{v.bloodGroup}{/*{console.log(v.login_id.user_type)}*/}</td>

                                        <td>
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
export default AdminViewPatient;
