import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { IP_ADDRS } from "../service/Constant";

function Doctor() {
    const [doctor, setDoctor] = useState({
        firstName: "",
        lastName: "",
        doctorId: "",
        profilePicture: "",
        jwt: ""
    });
    const [pic, setPic] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let doc = JSON.parse(sessionStorage.getItem("doctor"));
        setDoctor({
            firstName: doc.firstName, lastName: doc.lastName, doctorId: doc.doctorId,
            profilePicture: doc.profilePicture.substring(15),
            jwt: doc.jwt
        })
    }, []);

    useEffect(() => {
        // fetchImage();
    }, [doctor])

    const logout = () => {
        sessionStorage.removeItem("doctor");
        navigate("/");
    }

    const fetchImage = () => {
        const options = {
            method: 'GET',
            url: `${IP_ADDRS}/api/doctor/profile_picture/${doctor.profilePicture}`,
            headers: { Authorization: `Bearer ${doctor.jwt}` }
        };

        axios.request(options).then(response => {
            setPic(response.data.image);
        }).catch(error => {
            console.error(error);
        });
    }


    return (
        <>

            <div className="container" style={{ marginBottom: "50px" }}>
                <div className="row my-3">
                    <div className="col-sm-3"><h2 className="">Hello, Dr.{doctor.firstName} {doctor.lastName}</h2></div>
                    <div className="col-sm-3"><img src={`${IP_ADDRS}/api/image/ROLE_DOCTOR/${doctor.doctorId}`} style={{'height':'100px','width':'100px'}}></img></div>
                    {/* <div className="col-sm-3"><img src={`data:image/jpg;base64,${pic}`} style={{ 'height': '100px', 'width': '100px' }}></img></div> */}
                    <div className="col-sm-6">
                        <button onClick={logout} style={{ "float": "right" }} className="btn btn-danger">Logout</button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Update Profile</h5>
                                <p className="card-text">Update your account details.</p>
                                <button onClick={() => navigate("/updatedoctor")} className="btn btn-primary">UPDATE</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Update Time Table</h5>
                                <p className="card-text">Update your time table.</p>
                                <button onClick={() => navigate("/updatetimetable")} className="btn btn-info">UPDATE</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row my-3">
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Change Password</h5>
                                <p className="card-text">Change your password.</p>
                                <button onClick={() => navigate("/changepassworddoctor")} className="btn btn-success">CHANGE</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Current Appointments</h5>
                                <p className="card-text">Check your current appointments.</p>
                                <button onClick={() => navigate("/doctorcurrentappointments")} className="btn btn-warning">CHECK</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Set Time Table</h5>
                                <p className="card-text">Set Your Time Table for Appointments</p>
                                <button onClick={() => navigate("/set_time_table")} className="btn btn-success">CHANGE</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Appointment History</h5>
                                <p className="card-text">Check your appointment history.</p>
                                <button onClick={() => navigate("/doctorappointmenthistory")} className="btn btn-primary">CHECK</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row my-3">

                </div>



            </div>
        </>
    );

}

export default Doctor;