import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";

function Admin() {
    const [admin, setAdmin] = useState({});
    const [cnt, setCnt] = useState(0);

    useEffect(() => {
        let admin = JSON.parse(sessionStorage.getItem("admin"));
        setAdmin(admin);
        if (cnt === 0) {
            setCnt(1);
            // window.location.reload();

        }

    }, []);

    const logout = () => {
        sessionStorage.removeItem("admin");
        navigate("/");
    }

    const navigate = useNavigate();
    return (
        <>

            <div className="container" style={{ marginBottom: "50px" }}>
                <div className="row my-3">
                    <div className="col-sm-6"><h2 className="">Hello {admin.email}</h2>
                    </div>
                    <div className="col-sm-6">
                        <button className="" onClick={logout}>Logout</button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Verify Doctor</h5>
                                <p className="card-text">Verify Doctor to register for platform</p>
                                <button onClick={() => navigate("/verify_doctor")} className="btn btn-primary">Verify</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">View Doctor List</h5>
                                <p className="card-text">View details of all registered doctors.</p>
                                <button onClick={() => navigate("/viewdoctor")} className="btn btn-warning">VIEW</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row my-3">
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Un-Verify Doctor</h5>
                                <p className="card-text">Un verify doctor</p>
                                <button onClick={() => navigate("/viewdoctor")} className="btn btn-info">Un-Verify</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">View Patient</h5>
                                <p className="card-text">View details of all registered patients.</p>
                                <button className="btn btn-success" onClick={() => navigate("/viewpatient")}>VIEW</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row my-3">
                    {/* <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Enable/Disable</h5>
                                <p className="card-text">Enable or disable a patient.</p>
                                <button onClick={() => navigate("/viewpatient")} className="btn btn-success">ENABLE/DISBLE</button>
                            </div>
                        </div>
                    </div> */}
                     <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Remove Doctor Suspension</h5>
                                <p className="card-text">Remove.</p>
                                <button onClick={() => navigate("/suspended_doctor_list")} className="btn btn-primary">Remove</button>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Upload Home Video</h5>
                                <p className="card-text">Click to upload Home vidoe</p>
                                <button onClick={() => navigate("/home_video_upload")} className="btn btn-info">ADD</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row my-3">
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Suspend Dcotor</h5>
                                <p className="card-text">click to go</p>
                                <button onClick={() => navigate("/doctor_list_for_suspend")} className="btn btn-warning">Suspend Doctor</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}





{/*
class Admin extends Component {
    render() {
        return (
            <div>
                <h1>Admin Page</h1>
                <button type="button" className="btn btn-success" style={{marginLeft: "10px"}} onClick={addDoctor}>Add New Doctor</button>
            </div>
        );
    }
}
*/}
export default Admin;