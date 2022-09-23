import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table'
import axios from "axios";
import { IP_ADDRS } from "../service/Constant";
import swal from "sweetalert";

function UpdateTimeTable() {

    const [doctorId, setDoctorId] = useState("");
    const [TimeTable, setTimeTable] = useState([]);
    const [data, setData] = useState({
        email: "",
        doctorttId: "",
        doctorId: {},
        weekday: "",
        startTime: "",
        endTime: "",
        slotDuration: "",
        breakTime: ""

    })
    const navigate = useNavigate();
    const logout = () => {
        sessionStorage.removeItem("doctor");
        navigate("/");
    }
    useEffect(() => {
        let doc = JSON.parse(sessionStorage.getItem("doctor"));

        setDoctorId(doc.doctorId);
        setData({ email: doc.email });
        setTimeTable(doc.timetables);
        axios.get(`${IP_ADDRS}/api/doctor/get_doctor_timetable/${doc.doctorId}`,
            { headers: { "Authorization": `Bearer ${doc.jwt}` } })
            .then(res => {
                setTimeTable(res.data);
                // console.log(res.data);
            })
            .catch(err => {
                swal("Something Went Wrong", "", "warning");
            })

    }, []);

    const getTimeTable = () => {

    }
    const update = (ev) => {
        sessionStorage.setItem("daytimetable", JSON.stringify(ev))
        navigate("/updatetimetablebyday")
    }

    const changeHandler = (e) => {
        setData((data) => ({
            ...data,
            [e.target.name]: e.target.value
        }));
        // console.log(e.target.name+" "+e.target.value)
    }
    const notAvailable = (ev) => {
    }

    const available = (ev) => {
    }


    return (
        <>

            <div className="container my-4" style={{ marginBottom: "50px" }}>
                <button className="btn btn-danger" onClick={logout} style={{ float: "right", marginTop: "10px", marginRight: "10px" }}>Logout</button>
                <button className='btn btn-secondary' style={{ float: "right", marginTop: "10px", marginRight: "10px" }} onClick={() => navigate("/doctor")}>Go Back</button>
                <br /><br />                <div>
                    <button className="btn btn-primary" onClick={getTimeTable}>Get Latest TimeTable</button>
                    <h3>Doctor List</h3>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-light">
                            <tr>
                                <th>Weekday</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Break Time</th>
                                <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {TimeTable.map((v, i) => {
                                return (
                                    <tr key={`tt${v}${i}`}>
                                        <td>{v.weekday}</td>
                                        <td><input type="time" value={v.startTime} disabled style={{ "border": "none" }}></input></td>
                                        <td><input type="time" value={v.endTime} disabled style={{ "border": "none" }}></input></td>
                                        <td><input type="time" value={v.breakTime} disabled style={{ "border": "none" }}></input></td>
                                        <td><button className="btn btn-primary" style={{ marginRight: "10px" }} onClick={() => update(v)}>Update</button></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div></>
    );
}
export default UpdateTimeTable;