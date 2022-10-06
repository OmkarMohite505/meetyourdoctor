import { type } from "@testing-library/user-event/dist/type";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { IP_ADDRS } from "../service/Constant";

function Patient() {
    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        patientId: "",
        profilePicture: "",
        token: ""

    });
    const [pic, setPic] = useState([]);
    const [contentType, setContentType] = useState('');
    const navigate = useNavigate();

    // Similar to componentDidMount and componentDidUpdate:  
    useEffect(() => {
        let patient = JSON.parse(sessionStorage.getItem("patient"));
        if (patient.profilePicture === null) {
            setState({
                firstName: patient.firstName, lastName: patient.lastName, patientId: patient.patientId,
                token: patient.jwt
            });
        }
        else {
            setState({
                firstName: patient.firstName, lastName: patient.lastName, patientId: patient.patientId,
                profilePicture: patient.profilePicture.substring(15),
                token: patient.jwt
            });
        }


        // console.log(patient.profilePicture.substring(15));
    }, []);

    useEffect(() => {
        // fetchImage();
    }, [state])

    const logout = () => {
        sessionStorage.removeItem("patient");
        navigate("/");
    }

    const fetchImage = () => {
        const options = {
            method: 'GET',
            url: `${IP_ADDRS}/api/patient/profile_picture/${state.profilePicture}`,
            headers: { Authorization: `Bearer ${state.token}` }
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
                    <div className="col-sm-3"><h2 className="">Hello, {state.firstName} {state.lastName}</h2></div>

                    <div className="col-sm-3"> <img src={`${IP_ADDRS}/api/image/ROLE_PATIENT/${state.patientId}`} style={{'height':'100px','width':'100px'}}></img></div>
                    {/* <div className="col-sm-3"><img src={`data:image/jpg;base64,${pic}`} style={{ 'height': '100px', 'width': '100px' }}></img></div> */}
                    <div className="col-sm-6">
                        <button onClick={logout} style={{ "float": "right" }} className="btn btn-danger">Logout </button>
                    </div>
                </div>

                <div className="row my-3">
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Update Profile</h5>
                                <p className="card-text">Update your account details.</p>
                                <button onClick={() => navigate("/updatepatient")} className="btn btn-primary">UPDATE</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Search Doctor</h5>
                                <p className="card-text">Search doctor.</p>
                                <button onClick={() => navigate("/searchdoctor")} className="btn btn-info">SEARCH</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row my-3">
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Current Appointments</h5>
                                <p className="card-text">Check your current appointments.</p>
                                <button onClick={() => navigate("/patientcurrentappointments")} className="btn btn-success">CHECK</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Appointment History</h5>
                                <p className="card-text">Check your appointment history.</p>
                                <button onClick={() => navigate("/patientappointmenthistory")} className="btn btn-warning">CHECK</button>
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
                                <button onClick={() => navigate("/changepasswordpatient")} className="btn btn-success">CHANGE</button>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Book Appointment</h5>
                                <p className="card-text">Book your appointment.</p>
                                <button onClick={() => navigate("/searchdoctor")} className="btn btn-info">BOOK</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="row my-3">
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Change Password</h5>
                                <p className="card-text">Change your password.</p>
                                <button onClick={() => navigate("/changepasswordpatient")} className="btn btn-success">CHANGE</button>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </>
    );
}
















{/*
class Patient extends Component {
    constructor(props) {
        super(props)

        this.state = {
            patientId: '',
            firstName: ''
        }

    }
    componentDidMount(){
        let patient = JSON.parse(sessionStorage.getItem("patient"));
        this.setState({
            patientId: patient.patient_id,
            firstName: patient.first_name
        })
    }
    render() {
        return (
            <div>
                <h1>Patient Page{this.state.patientId}{this.state.firstName}</h1>
            </div>
        );
    }
}
*/}
export default Patient;