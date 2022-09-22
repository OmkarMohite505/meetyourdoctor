import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { IP_ADDRS } from "../service/Constant";
import ImageService from "../service/ImageService";


const CloseAppointment = (props) => {
    const [doctor, setDoctor] = useState();
    const [imageFile, setImageFile] = useState([]);
    const [showPic, setPic] = useState({});
    const navigate = useNavigate();
    const [imageURLs, setImageURLs] = useState([]);
    const [appointment, setAppointment] = useState({});
    const [state, setState] = useState({ description: "", status: "" });
    const [status, setStatus] = useState("");


    const showImage = () => {
        // console.log("-------- length " + imageFile.length)
        if (imageFile.length < 1)
            return;
        // console.log("---------inside---------------")
        const newImageURL = [];
        imageFile.forEach(image => newImageURL.push(URL.createObjectURL(image)));
        setImageURLs(newImageURL);
    }

    const handleChange = (event) => {
        // setImageFile(event.target.files[0]);
        let arr = imageFile;
        arr.push(event.target.files[0]);
        setImageFile(arr);
        // console.log("------------length handle chage " + imageFile.length)
        // console.log(imageFile);
        showImage();
    }

    const handleSubmission = () => {
        swal({
            title: "Are you Confirm to Modify Appointment?",
            text: "Your Appontment Will modify!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willCreate) => {
                if (willCreate) {


                    const formData = new FormData();
                    imageFile.forEach(image => formData.append('imageFile', image));



                    const options = {
                        method: 'PUT',
                        url: `${IP_ADDRS}/api/doctor/appointment/upload_images/${appointment.appointmentId}/${appointment.patient.patientId}`,
                        headers: {
                            Authorization: `Bearer ${doctor.jwt}`,
                            'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
                        },
                        data: formData
                    };

                    axios.request(options).then(response => {
                        const obj = {
                            appointmentId: appointment.appointmentId,
                            patientId: appointment.appointmentId,
                            status: state.status,
                            appointmentDescription: state.description
                        }

                        axios.put(`${IP_ADDRS}/api/doctor/appointment/update_status`, obj, { headers: { "Authorization": `Bearer ${doctor.jwt}` } })
                        .then(res => {
                            swal("All Recors Updated", "", "success");
                            navigate(`/doctor`)
                        })
                        .catch(err => { swal("Something went Wrong", "", "error") });

                    }).catch(error => {
                    });

                    return;


                    //1st argumet 'imageFile' name must be matches with spring-boot requeat param name MultipartFile imageFile
                    axios.put(`${IP_ADDRS}/api/doctor/appointment/upload_images/${appointment.appointmentId}/${appointment.patient.patientId}`, formData, { headers: { "Authorization": `Bearer ${doctor.jwt}` } })
                        .then(res => {
                            swal("Successfully Uploaded All Pictures", "", "success");

                            const obj = {
                                appointmentId: appointment.appointmentId,
                                patientId: appointment.appointmentId,
                                status: state.status,
                                appointmentDescription: state.description
                            }

                            console.log(obj);

                            axios.put(`${IP_ADDRS}/api/doctor/appointment/update_status`, obj, { headers: { "Authorization": `Bearer ${doctor.jwt}` } })
                                .then(res => {
                                    swal("All Recors Updated", "", "success");
                                    navigate(`/doctor`)
                                })
                                .catch(err => { swal("Something went Wrong", "", "error") });


                            
                        })
                        .catch(err => { swal("Something Went Wrong", "", "error") });

                    }});

                }

                useEffect(() => {
                    let doctor = JSON.parse(sessionStorage.getItem("doctor"));
                    let appointment = JSON.parse(sessionStorage.getItem("appt"));
                    setDoctor(doctor);
                    setAppointment(appointment);
                }, [])

                const handleState = (e) => {
                    setState({ ...state, [e.target.name]: e.target.value });
                }

                return (
                    <div style={{ "marginLeft": "100px" }}>
                        <h1>
                            Modify Appointment
                        </h1>
                        <label htmlFor="">Description of Appointment</label><br />
                        <textarea name="description" id="" cols="60" rows="10" onChange={handleState}></textarea><br />
                        <label htmlFor="">Status</label>
                        <select name="status" id="" style={{ "marginLeft": "20px" }} onChange={handleState}>
                            <option value="OPEN">OPEN</option>
                            <option value="CLOSED">CLOSE</option>
                            <option value="CANCELLED">CANCEL</option>
                        </select><br />

                        <input type="file" multiple accept="image/*" onChange={handleChange} name="file"></input>
                        <button onClick={handleSubmission} className='btn btn-primary' style={{ 'margin': '100px' }}>Update Appointment</button>&emsp;
                        {/* <button onClick={showImage} className='btn btn-info'>Show Image</button> */}
                        {imageURLs.map(image => <p> <img src={image} style={{ 'height': '200px', 'width': '200px' }}></img>&emsp;&emsp;</p>)}
                        <Link to={`/list`}><button className="btn btn-primary">Back</button></Link>

                    </div>

                )

            }
export default CloseAppointment;