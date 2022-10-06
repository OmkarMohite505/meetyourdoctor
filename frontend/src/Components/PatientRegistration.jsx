import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import swal from "sweetalert";
import { IP_ADDRS } from "../service/Constant";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'

function PatientRegistration() {

    const [data, setData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        mobileNumber: "",
        alternateMobileNumber: "",
        gender: "",
        bloodGroup: "",
        dob: "",
        aadharNo: "",
        specialityType: "",
        servicesProvided: "",
        specialityDescription: "",
        specialityPhoto: "",
        fees: "",
        town: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
        weekday: "",
        startTime: "",
        endTime: "",
        slotDuration: "",
        breakTime: "",
        panCardNo: "",
        nameAsPerBank: "",
        bankName: "",
        bankAccountNo: "",
        IFSC_Code: ""

    });

    const [Error, setError] = useState({
        user_name_error: "",
        password_error: "",
        first_name_error: "",
        last_name_error: "",
        mobile_number_error: "",
        gender_error: "",
        blood_group_error: "",
        dob_error: ""
    });

    const [flag, setFlag] = useState({
        email: false,
        password: false,
        firstName: false,
        lastName: false,
        mobileNumber: false,
        gender: false,
        bloodGroup: false,
        dob: false,
    });
    const [countrylist, setCountryList] = useState({});
    const [statelist, setState] = useState([]);
    const [stateId, setStateId] = useState();
    const [citylist, setCityList] = useState([]);
    const [yearList, setYearList] = useState([]);

    const [profilePic, setProfilePic] = useState([]);
    const [diplomaPic, setDiplomaPic] = useState([]);
    const [graduationPic, setGraduationPic] = useState([]);
    const [postGraduPic, setPostGraduPic] = useState([]);
    const [specialityPic, setSpecialityPic] = useState([]);

    const [passType, setPassType] = useState("text");
    const [isChecked, setIsChecked] = useState(false);


    const handleShowPassword = () => {
        setIsChecked(!isChecked);
    }
    useEffect(() => {
        if (isChecked == true) {
            setPassType("text");
            return;
        }
        setPassType("password");
    }, [isChecked])


    const handlePictureChange = (event) => {
        if (event.target.name === "profilePic") {
            if (event.target.files[0].size > 200010) {
                swal("Maximum File Size allowed is 200 kb", "Choose Profile picture again with less than 200 kb size", "warning");
                return;
            }

            setProfilePic(event.target.files[0]);
        }

        if (event.target.name === "diplomaPic")
            setDiplomaPic(event.target.files[0]);
        if (event.target.name === "graduationPic")
            setGraduationPic(event.target.files[0]);
        if (event.target.name === "postGraduPic")
            setPostGraduPic(event.target.files[0]);
        if (event.target.name === "specialityPic")
            setSpecialityPic(event.target.files[0]);
    }

    const eduType = ["Select Education", "MBBS", "BDS", "BAMS", "BUMS", "BHMS", "BYNS", "DM", "MS", "MD"];
    const graduationList = ["Select Education", "MBBS", "BDS", "BAMS", "BUMS", "BHMS", "BYNS", "DM"];
    const postGraduList = ["Select Education", "MS", "MD"];

    const specialityType = ["Select Speciality", "DERMATOLOGISTS", "CARDIOLOGISTS", "GENERAL_PHYSICIAN", "UROLOGISTS", "NEUROLOGISTS",
        "RHEUMATOLOGISTS", "RADIOLOGISTS", "PULMONOLOGISTS", "PSYCHIATRISTS",
        "PODIATRISTS", "PHYSIATRISTS", "PEDIATRICIANS", "PATHOLOGIST", "OTOLARYNGOLOGISTS",
        "OSTEOPATHS", "OPHTHALMOLOGISTS", "ONCOLOGISTS", "GYNECOLOGISTS",
        "NEPHROLOGISTS", "INTERNISTS", "HEMATOLOGISTS", "GASTROENTEROLOGISTS", "ENDOCRINOLOGISTS",
        "ANESTHESIOLOGISTS", "IMMUNOLOGISTS"

    ];
    const roleSelect = ["Select Role", "PATIENT", "DOCTOR"];

    useEffect(() => {
        axios.get(`https://cdn-api.co-vin.in/api/v2/admin/location/states`)
            .then(res => {
                let arr = [];

                let st = { "state_id": 0, "state_name": "Select State" };
                arr = res.data.states;
                arr.unshift(st);
                setState(arr);
            });

        populateYearList();
    }, [])


    const populateYearList = () => {
        let currentYear = new Date().getFullYear();
        let earliestYear = 1950;
        let arr = ["Select Year"];
        while (currentYear >= earliestYear) {
            arr.push(currentYear);
            currentYear -= 1;
        }
        setYearList(arr);
    }

    const handleState = (event) => {
        var st_id = event.target.value;
        setStateId(st_id);

        var st = statelist.find(e => e.state_id == st_id);



        setData({ ...data, state: st.state_name });
    }
    useEffect(() => {
        if (stateId !== 0)
            axios.get(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateId}`)
                .then(res => {
                    let arr = [];

                    let ct = { "district_id": 0, "district_name": "Select City" };
                    arr = res.data.districts;
                    arr.unshift(ct);
                    setCityList(arr);
                });
    }, [stateId])

    const [cricket, setCricket] = useState(false);
    const [swimming, setSwimming] = useState(false);
    const [holleyboll, setHolleyboll] = useState(false);
    const [hobbies, setHobbies] = useState([]);
    const [patientRole, setPatientRole] = useState(false);
    const [doctorRole, setDoctorRole] = useState(false);
    const [diploma, setDiploma] = useState(false);
    const [graduation, setGraduation] = useState(false);
    const [postGradu, setPostGradu] = useState(false);
    const [role, setRole] = useState("");

    const [diplomaEdu, setDiplomaEdu] = useState({ educationType: "", year: "", percentageMarks: "", certificatePhoto: "" });
    const [graduationEdu, setGraduationEdu] = useState({ educationType: "", year: "", percentageMarks: "", certificatePhoto: "" });
    const [postGraduEducation, setPostGraduEducation] = useState({ educationType: "", year: "", percentageMarks: "", certificatePhoto: "" });

    const setDiplomaData = (e) => {
        setDiplomaEdu((data) => ({
            ...data,
            [e.target.name]: e.target.value
        }));
    }
    const setGraduationData = (e) => {
        setGraduationEdu((data) => ({
            ...data,
            [e.target.name]: e.target.value
        }));
    }
    const setPostGraduData = (e) => {
        console.log(e.target.value)
        console.log(e.target.name)
        setPostGraduEducation((data) => ({
            ...data,
            [e.target.name]: e.target.value
        }));
    }

    const getPosition = () => {
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }

    const onSuccess = (position) => {
        const { latitude, longitude } = position.coords;
        console.log(latitude, longitude);
        var lat = 18;
        var lng = 73;
        const mapMyIndiaApiKey = "your_api_key";
        var url = `http://apis.mapmyindia.com/advancedmaps/v1/${mapMyIndiaApiKey}/rev_geocode?lng=${latitude}&lat=${longitude}`;
        axios.get(url).then(res => console.log(res.data)).catch(err => console.log(err));
        const googleAPIKey = "your_api_key";
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleAPIKey}`)
            .then(res => { console.log(res.data) })
            .catch(err => { console.log(err) })
            swal("Currently this option not available","Please Enter Address manually","info");
    }
    const onError = () => {

    }







    const setUserRole = (e) => {
        console.log(e.target.value);
        setRole(e.target.value);
    }
    useEffect(() => {
        if (role === "PATIENT") {
            setPatientRole(true);
            setDoctorRole(false);
        }
        if (role === "DOCTOR") {
            setPatientRole(true);
            setDoctorRole(true);
        }
        if (role === "Select Role") {
            setPatientRole(false);
            setDoctorRole(false);
        }


    }, [role])

    function toggle(value) {
        return !value;
    }


    const validateEmail = (e) => {
        let email = e.target.value;
        let emailRegex = new RegExp(/^[A-Za-z0-9._-]+@[A-Za-z0-9._-]+\.[A-Za-z]{2,4}$/);
        if (emailRegex.test(email) === true) {
            setError({ ...Error, user_name_error: "" });
            setFlag({ ...flag, email: true });

        }
        else {
            setError({ ...Error, user_name_error: "Email format should be 'abc@gmail.com' and it can include (A-Z a-z 0-9 . _ -)" });
            setFlag({ ...flag, email: false });

        }
    }

    const validatePassword = (e) => {
        let pass = e.target.value;
        let passRegex = new RegExp(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z]).{8,16}$/);
        if (passRegex.test(pass) === true) {
            // alert("true");
            setError({ ...Error, password_error: "" });
            setFlag({ ...flag, password: true });

        }
        else {
            // alert("false");
            setError({ ...Error, password_error: "Password must be alphanumeric and should contains at least a special character with min length 8 and max length 16" });
            setFlag({ ...flag, password: false });

        }
    }

    const validateFirstName = (e) => {
        let name = e.target.value;
        if (name === "") {
            setError({ ...Error, first_name_error: "Please enter First Name" });
            setFlag({ ...flag, firstName: false });

        }
        else {
            setError({ ...Error, first_name_error: "" });
            setFlag({ ...flag, firstName: true });

        }
    }
    const validateLastName = (e) => {
        let name = e.target.value;
        if (name === "") {
            setError({ ...Error, last_name_error: "Please enter Last Name" });
            setFlag({ ...flag, lastName: false });

        }
        else {
            setError({ ...Error, last_name_error: "" });
            setFlag({ ...flag, lastName: true });

        }
    }
    const validateMobileNumber = (e) => {
        let mobileNumber = e.target.value;
        let mnRegex = new RegExp(/^[0-9]{10}$/);
        // if (mnRegex.test(mobileNumber) === true)
        if (mobileNumber.length > 15) {
            setError({ ...Error, mobile_number_error: "" });
            setFlag({ ...flag, mobileNumber: true });

        }
        else {
            setError({ ...Error, mobile_number_error: "Enter Correct Mobile No" });
            setFlag({ ...flag, mobileNumber: false });

        }
    }

    const validateDob = (e) => {
        let dob = e.target.value;
        if (dob === "") {
            setError({ ...Error, dob_error: "Please enter BirthDate" });
            setFlag({ ...flag, dob: false });

        }
        else {
            setError({ ...Error, dob_error: "" });
            setFlag({ ...flag, dob: true });

        }
    }
    const validateBloodGroup = (e) => {
        let bg = e.target.value;
        if (bg === "") {
            setError({ ...Error, blood_group_error: "Please select Blood Group" });
            setFlag({ ...flag, bloodGroup: false });

        }
        else {
            setError({ ...Error, blood_group_error: "" });
            setFlag({ ...flag, bloodGroup: true });

        }
    }
    const navigate = useNavigate();

    const changeHandler = (e) => {
        setData((data) => ({
            ...data,
            [e.target.name]: e.target.value
        }));
    }
    const refreshPage = (e) => {

        swal({
            title: "Are you Confirm to Reset Page?",
            text: "All entered fields will be gone afte reset",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((yes) => {
                if (yes) {
                    window.location.reload();
                }
            })
    };
    const goToHomePage = () => {
        swal({
            title: "Are you Confirm to Cancel Registration?",
            text: "",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((yes) => {
                if (yes) {
                    navigate(`/`)
                }
            })
    }

    const setPatientHobbies = () => {


    }
    const submitData = () => {
        // alert(flag.password);
        // validateMobileNumber();
        if (!flag.email || !flag.password) {
            swal("Enter Correct Email and Password", "", "warning");
            return;
        }


        swal({
            title: "Are you Confirm to Register?",
            text: "Make sure you entered all correct fields!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willCreate) => {
                if (willCreate) {


                    // setPatientHobbies();
                    var arr = [];
                    if (cricket === true)
                        arr.push("CRICKET")
                    if (swimming === true)
                        arr.push("SWIMMING");
                    if (holleyboll === true)
                        arr.push("HOLLEYBOLL");
                    console.log(arr);

                    if (role === "PATIENT") {
                        const obj = {
                            "email": data.email, "password": data.password, "firstName": data.firstName,
                            "lastName": data.lastName, "mobileNumber": data.mobileNumber,
                            "alternateMobileNumber": data.alternateMobileNumber, "gender": data.gender,
                            "bloodGroup": data.bloodGroup, "dob": data.dob, "hobbies": arr,
                            "address": [{ "town": data.town, "city": data.city, "state": data.state, "country": data.country, "pincode": data.pincode }],
                            "roles": ["ROLE_PATIENT"]
                        }
                        console.log(obj);
                        axios.post(`${IP_ADDRS}/auth/register_patient`, obj)
                            .then(res => {
                                swal("Congratulations !, Registered Successfully", "Redirecting to login page", "success");
                                let patientId = res.data.id;
                                console.log("Patient Id : " + patientId);
                                const form = new FormData();
                                form.append("profilePic", profilePic);
                                const options = {
                                    method: 'PATCH',
                                    url: `${IP_ADDRS}/api/image/ROLE_PATIENT/upload_profile_picture/${patientId}`,
                                    headers: {
                                        Authorization: ``,
                                        'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
                                    },
                                    data: form
                                };

                                axios.request(options).then(response => {
                                }).catch(error => {
                                });


                                // swal("Registration SuccessFull", "Redirecting to Login Page", "success");
                                navigate(`/login`);
                            })
                            .catch(err => { swal("Something Went Wrong", "Please Try Again", "error") });
                    }

                    if (role === "DOCTOR") {

                        var quali = [];

                        if (diploma)
                            quali.push(diplomaEdu);
                        if (graduation)
                            quali.push(graduationEdu);
                        if (postGradu)
                            quali.push(postGraduEducation);





                        const obj = {
                            "email": data.email, "password": data.password, "firstName": data.firstName,
                            "lastName": data.lastName, "mobileNumber": data.mobileNumber,
                            "alternateMobileNumber": data.alternateMobileNumber, "gender": data.gender,
                            "bloodGroup": data.bloodGroup, "dob": data.dob, "hobbies": arr,
                            "aadharNo": data.aadharNo, "fees": data.fees,
                            "speciality": [{ "specialityType": data.specialityType, "servicesProvided": data.servicesProvided, "specialityDescription": data.specialityDescription, "specialityPhoto": data.specialityPhoto }],
                            "address": [{ "town": data.town, "city": data.city, "state": data.state, "country": data.country, "pincode": data.pincode }],
                            "qualification": quali,
                            "roles": ["ROLE_DOCTOR"],
                            "timetables": [{ "weekday": data.weekday, "startTime": data.startTime, "endTime": data.endTime, "breakTime": data.breakTime, "slotDuration": data.slotDuration }],
                            "bankAccount": { "nameAsPerBank": data.nameAsPerBank, "bankName": data.bankName, "bankAccountNo": data.bankAccountNo, "IFSC_Code": data.IFSC_Code, "panCardNo": data.panCardNo }
                        }
                        console.log(obj);
                        axios.post(`${IP_ADDRS}/auth/register_doctor`, obj)
                            .then(res => {
                                swal("Congratulations !, Registered Successfully", "Redirecting to login page", "success");
                                // upload profile pic
                                let doctoId = res.data.id;
                                const form = new FormData();
                                form.append("profilePic", profilePic);
                                const options = {
                                    method: 'PATCH',
                                    url: `${IP_ADDRS}/api/image/ROLE_DOCTOR/upload_profile_picture/${doctoId}`,
                                    headers: {
                                        Authorization: ``,
                                        'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
                                    },
                                    data: form
                                };

                                axios.request(options).then(response => {
                                }).catch(error => {
                                });

                                //upload Eduactional photo
                                let allEducPic = [];
                                if (diploma)
                                    allEducPic.push(diplomaPic);
                                if (graduation)
                                    allEducPic.push(graduationPic);
                                if (postGradu)
                                    allEducPic.push(postGraduPic);

                                const formEduc = new FormData();
                                // formEduc.append("imageFile", profilePic);
                                allEducPic.forEach(image => formEduc.append('imageFile', image));
                                const opt = {
                                    method: 'PUT',
                                    url: `${IP_ADDRS}/api/image/ROLE_DOCTOR/educational_picture/${doctoId}`,
                                    headers: {
                                        Authorization: ``,
                                        'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
                                    },
                                    data: formEduc
                                };

                                axios.request(opt).then(response => {
                                }).catch(error => {
                                });

                                //upload speciality photo
                                const formSpeciality = new FormData();
                                formSpeciality.append("specialityPic", specialityPic);
                                const spec = {
                                    method: 'PATCH',
                                    url: `${IP_ADDRS}/api/image/ROLE_DOCTOR/speciality_picture/${doctoId}`,
                                    headers: {
                                        Authorization: ``,
                                        'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
                                    },
                                    data: formSpeciality
                                };

                                axios.request(spec).then(response => {
                                }).catch(error => {
                                });







                                navigate(`/login`)
                            })
                            .catch(err => { console.log(err) });
                    }
                }
            });

    }
    const option = ['PATIENT', 'DOCTOR'];



    return (
        <div>

            <br /><br />
            <div className="container" style={{ marginBottom: "50px" }}>
                <div className="row my-4">
                    <div className="card col-md-6 offset-md-3 offset-md-1">
                        <h2 className='text-center'>User Registration </h2>


                        <div className="form-group">
                            <label><h2>Choose :</h2></label>
                            <select name='role' value={role} onChange={(e) => setUserRole(e)} style={{ 'width': '130px', 'height': '40px', 'borderRadius': '7px', 'fontSize': '20px', 'backgroundColor': 'skyblue' }}>
                                {
                                    roleSelect.map((r, i) => (
                                        <option key={`${r}${i}`}>{r}</option>
                                    ))
                                }

                            </select>

                        </div>

                        {patientRole &&
                            <div>

                                <div className="form-group">
                                    <label><b> Email: </b></label>
                                    <input type="text" placeholder="Enter Email" name="email" className="form-control"
                                        value={data.email} onChange={changeHandler} onBlur={validateEmail} />
                                    <span className="text text-danger">{Error.user_name_error}</span>

                                </div>
                                <div style={{ marginTop: '10px' }} className="form-group">
                                    <label><b>  Password: </b></label>
                                    <input type={passType} placeholder="Password" name="password" className="form-control"
                                        value={data.password} onChange={changeHandler} onBlur={validatePassword} />
                                    <span className="text text-danger">{Error.password_error}</span>
                                    <span><input type="checkbox" checked={isChecked} onChange={handleShowPassword} style={{ 'marginLeft': '150px' }} id="show"></input>&emsp;</span><label htmlFor="show">Show Password</label>
                                </div >
                                <div style={{ marginTop: '10px' }} className="form-group">
                                    <label><b>  first Name: </b></label>
                                    <input type="text" placeholder="First Name" name="firstName" className="form-control"
                                        value={data.firstName} onChange={changeHandler} onBlur={validateFirstName} />
                                    <span className="text text-danger">{Error.first_name_error}</span>
                                </div>
                                <div style={{ marginTop: '10px' }} className="form-group">
                                    <label><b>  Last Name: </b></label>
                                    <input type="text" placeholder="Last Name" name="lastName" className="form-control"
                                        value={data.lastName} onChange={changeHandler} onBlur={validateLastName} />
                                    <span className="text text-danger">{Error.last_name_error}</span>
                                </div >

                                <div style={{ marginTop: '10px' }} className="form-group">
                                    <label><b>  Profile Picture: </b></label>
                                    <input type="file" accept=".png, .jpg,.jpeg" onChange={handlePictureChange} name="profilePic" className="form-control"></input>
                                    <span className="text text-danger"></span>
                                </div >

                                {/* <div style={{ marginTop: '10px' }} className="form-group">
                                        <label><b>  User mobile_number: </b></label>
                                        <input type="text" placeholder="User mobile_number" name="mobileNumber" className="form-control"
                                            value={data.mobileNumber} onChange={changeHandler} onBlur={validateMobileNumber} />
                                        <span className="text text-danger">{Error.mobile_number_error}</span>
                                    </div> */}
                                <div style={{ marginTop: '10px' }} className="form-group">
                                    <label><b>  Mobile Number: </b></label>
                                    <PhoneInput
                                        country={'in'}
                                        value={data.mobileNumber}
                                        onChange={phone => {
                                            let mb = `+${phone}`;
                                            console.log(mb);
                                            setData({ ...data, mobileNumber: mb });
                                        }} countryCodeEditable={false} enableSearch={true} enableAreaCodes={true}

                                    />
                                    <span className="text text-danger">{Error.mobile_number_error}</span>
                                </div>


                                {/* <div style={{ marginTop: '10px' }} className="form-group">
                                    <label><b>  Alternate mobile Number: </b></label>
                                    <input type="text" placeholder="Alternate mobile_number" name="alternateMobileNumber" className="form-control"
                                        value={data.alternateMobileNumber} onChange={changeHandler} onBlur={validateMobileNumber} />
                                    <span className="text text-danger">{Error.mobile_number_error}</span>
                                </div> */}

                                <div style={{ marginTop: '10px' }} className="form-group">
                                    <label><b>  Alternate mobile Number: </b></label>
                                    <PhoneInput
                                        country={'in'}
                                        value={data.alternateMobileNumber}
                                        onChange={phone => {
                                            let mb = `+${phone}`;
                                            console.log(mb);
                                            setData({ ...data, alternateMobileNumber: mb });
                                        }} countryCodeEditable={false} enableSearch={true} enableAreaCodes={true}

                                    />
                                    <span className="text text-danger">{Error.mobile_number_error}</span>
                                </div>

                                <div style={{ marginTop: '10px' }} className="form-group" onChange={changeHandler} >
                                    <label><b>  Gender: </b></label>
                                    <input style={{ marginLeft: '10px' }} type="radio" value="MALE" name="gender" /> Male
                                    <input style={{ marginLeft: '10px' }} type="radio" value="FEMALE" name="gender" /> Female
                                    <input style={{ marginLeft: '10px' }} type="radio" value="OTHER" name="gender" /> Other
                                    <span className="text text-danger">{Error.gender_error}</span>
                                </div>
                                <div style={{ marginTop: '10px' }} className="form-group">
                                    <label><b>  Blood Group: </b></label>
                                    <select style={{ marginLeft: '10px' }} value={data.bloodGroup} name="bloodGroup" onChange={changeHandler} onBlur={validateBloodGroup}>
                                        <option value="">Select</option>
                                        <option value="A+">A+</option>
                                        <option value="B+">B+</option>
                                        <option value="O+">O+</option>
                                        <option value="AB+">AB+</option>
                                        <option value="A-">A-</option>
                                        <option value="B-">B-</option>
                                        <option value="O-">O-</option>
                                        <option value="AB-">AB-</option>
                                    </select>
                                    <span className="text text-danger">{Error.blood_group_error}</span>
                                </div>

                                <div style={{ marginTop: '10px' }} className="form-group">
                                    <label><b>  Date of Birth: </b></label>
                                    <input type="date" placeholder="Date Of Birth" name="dob" className="form-control"
                                        value={data.dob} onChange={changeHandler} onBlur={validateDob} />
                                    <span className="text text-danger">{Error.dob_error}</span>
                                </div >
                                <div style={{ marginTop: "10px" }} className="form-group">
                                    <b>Select Hobbies :</b><br></br>
                                    <input type="checkbox" name="cricket" value='CRICKET' onChange={() => setCricket(toggle)} id="ad" />&emsp;<label htmlFor="ad">Cricket</label><br></br>
                                    <input type="checkbox" name="swimming" value='SWIMMING' onChange={() => setSwimming(toggle)} id="us" />&emsp;<label htmlFor="us">Swimming</label><br></br>
                                    <input type="checkbox" name="holleyboll" value='HOLLEYBOLL' onChange={() => setHolleyboll(toggle)} id="sd" />&emsp;<label htmlFor="sd">Volleyboll</label><br />
                                </div>


                                <div style={{ marginTop: '10px' }} className="form-group">
                                    <label><b> Address: </b> <button onClick={getPosition} style={{ "marginLeft": "100px", "borderRadius": "5px", "fontSize": "12px" }}>Use My Current Location</button> </label><br></br>
                                    <label><p> Town: </p></label>
                                    <input type="text" placeholder="" name="town" className="form-control"
                                        value={data.town} onChange={changeHandler} />
                                    <span className="text text-danger"></span>
                                </div>

                                <div style={{ marginTop: '10px' }} className="form-group">
                                    <label><p> State: </p></label>

                                    <select name="statename" value={stateId} onChange={handleState}>
                                        {statelist.map((v, i) => (
                                            (i === 0) ? <option key={v}>Select State</option> :

                                                <option value={v.state_id} key={v.state_name}>{v.state_name}</option>
                                        ))}
                                        {/* {statelist.map((element, index) => <option key={index}>{element.state_name}</option>)} */}
                                    </select>
                                    {/* <input type="text" placeholder="" name="state" className="form-control" 
                    value={data.state} onChange={changeHandler} /> */}
                                    <span className="text text-danger"></span>
                                </div>

                                <div style={{ marginTop: '10px' }} className="form-group">
                                    <label><p> City: </p></label>
                                    <select name="city" value={data.city} onChange={changeHandler}>
                                        {citylist.map((v) => (
                                            <option key={v.district_id} value={v.district_name}>{v.district_name}</option>
                                        ))}

                                    </select>
                                    <span className="text text-danger"></span>
                                </div>
                                <div style={{ marginTop: '10px' }} className="form-group">
                                    <label><p> Country: </p></label>
                                    {/* <select name="country" value={data.country} onChange={changeHandler}>
                        {
                            countrylist.map((v)=>(
                                <option key={`${v.country}`} value={v.country}>{v.country}</option>
                            ))
                        }

                    </select> */}
                                    <input type="text" placeholder="" name="country" className="form-control"
                                        value={data.country} onChange={changeHandler} />
                                    <span className="text text-danger">{Error.mobile_number_error}</span>
                                </div>
                                <div style={{ marginTop: '10px' }} className="form-group">
                                    <label><p> PinCode: </p></label>
                                    <input type="text" placeholder="" name="pincode" className="form-control"
                                        value={data.pincode} onChange={changeHandler} />
                                    <span className="text text-danger"></span>
                                </div>


                            </div>}
                        {doctorRole &&
                            <div>

                                <div style={{ marginTop: '10px' }} className="form-group">
                                    <label><b>  Aadhar Number: </b></label>
                                    <input type="text" placeholder="Enter Aadhar Number" name="aadharNo" className="form-control"
                                        value={data.aadharNo} onChange={changeHandler} />
                                    <span className="text text-danger"></span>
                                </div>

                                <div style={{ marginTop: "10px" }} className="form-group">
                                    <b>Select Education :</b><br></br>
                                    {/* <input type="checkbox" name="diploma" value='diploma' onChange={() => setDiploma(toggle)} id="ad" />&emsp;<label htmlFor="ad">Diploma</label><br></br> */}
                                    <input type="checkbox" name="graduation" value='graduation' onChange={() => setGraduation(toggle)} id="gradu_id" />&emsp;<label htmlFor="gradu_id">Graduation</label><br></br>
                                    <input type="checkbox" name="postGradu" value='postGradu' onChange={() => setPostGradu(toggle)} id="post_id" />&emsp;<label htmlFor="post_id">Post Graduation</label><br />
                                </div>

                                {diploma && <div style={{ marginTop: "10px" }} className="form-group">
                                    <div style={{ marginTop: "10px" }} className="form-group">
                                        <b>Diploma :</b><br></br>
                                        <p>Enter Education Type :</p>
                                        {/* <input type="text" name="educationType" value={diplomaEdu.educationType} onChange={setDiplomaData} className="form-control"></input> */}
                                        <select name="educationType" value={diplomaEdu.educationType} onChange={setDiplomaData} style={{ "width": "180px" }}>
                                            {
                                                eduType.map((e, i) => (
                                                    <option value={e} key={`diploma${e}$`}>{e}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div style={{ marginTop: "10px" }} className="form-group">
                                        <p>Year of Passing</p>
                                        {/* <input type="number" name="year" value={diplomaEdu.year} onChange={setDiplomaData} className="form-control"></input> */}
                                        <select name="year" value={diplomaEdu.year} onChange={setDiplomaData} style={{ "width": "130px" }}>
                                            {
                                                yearList.map((y) => (
                                                    <option value={y} key={`diploma${y}`}>{y}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div style={{ marginTop: "10px" }} className="form-group">
                                        <p>Marks</p>
                                        <input type="number" name="percentageMarks" value={diplomaEdu.percentageMarks} onChange={setDiplomaData} className="form-control"></input>
                                    </div>

                                    <div style={{ marginTop: "10px" }} className="form-group">
                                        <p>Certicate Photo</p>
                                        <input type="file" accept=".png, .jpg,.jpeg" onChange={handlePictureChange} name="diplomaPic" className="form-control"></input>
                                    </div>

                                </div>}

                                {graduation && <div style={{ marginTop: "10px" }} className="form-group">
                                    <div style={{ marginTop: "10px" }} className="form-group">
                                        <b>Graduation :</b><br></br>
                                        <p>Enter Graduation Type :</p>
                                        {/* <input type="text" name="educationType" value={graduationEdu.educationType} onChange={setGraduationData} className="form-control"></input> */}
                                        <select name="educationType" value={graduationEdu.educationType} onChange={setGraduationData} style={{ "width": "180px" }}>
                                            {
                                                graduationList.map((e, i) => (
                                                    <option value={e} key={`gradu${e}`}>{e}</option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                    <div style={{ marginTop: "10px" }} className="form-group">
                                        <p>Year of Passing</p>
                                        {/* <input type="number" name="year" value={graduationEdu.year} onChange={setGraduationData} className="form-control"></input> */}
                                        <select name="year" value={graduationEdu.year} onChange={setGraduationData} style={{ "width": "130px" }}>
                                            {
                                                yearList.map((y, i) => (
                                                    <option value={y} key={`gradu${y}${i}`}>{y}</option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                    <div style={{ marginTop: "10px" }} className="form-group">
                                        <p>Marks</p>
                                        <input type="number" name="percentageMarks" value={graduationEdu.percentageMarks} onChange={setGraduationData} className="form-control"></input>
                                    </div>

                                    <div style={{ marginTop: "10px" }} className="form-group">
                                        <p>Certicate Photo</p>
                                        <input type="file" accept=".png, .jpg,.jpeg" onChange={handlePictureChange} name="graduationPic" className="form-control"></input>
                                    </div>

                                </div>}

                                {postGradu && <div style={{ marginTop: "10px" }} className="form-group">
                                    <div style={{ marginTop: "10px" }} className="form-group">
                                        <b>Post Graduation :</b><br></br>
                                        <p>Enter PostGraduation Type :</p>
                                        {/* <input type="text" name="educationType" value={postGraduEdu.educationType} onChange={setPostGraduData} className="form-control"></input> */}
                                        <select name="educationType" value={postGraduEducation.educationType} onChange={setPostGraduData} style={{ "width": "180px" }}>
                                            {
                                                postGraduList.map((e, i) => (
                                                    <option value={e} key={`postgradu${e}${i}`}>{e}</option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                    <div style={{ marginTop: "10px" }} className="form-group">
                                        <p>Year of Passing</p>

                                        <select name="year" value={postGraduEducation.year} onChange={setPostGraduData} style={{ "width": "130px" }}>
                                            {
                                                yearList.map((y, i) => (
                                                    <option value={y} key={`postgradu${y}`}>{y}</option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                    <div style={{ marginTop: "10px" }} className="form-group">
                                        <p>Marks</p>
                                        <input type="number" name="percentageMarks" value={postGraduEducation.percentageMarks} onChange={setPostGraduData} className="form-control"></input>
                                    </div>

                                    <div style={{ marginTop: "10px" }} className="form-group">
                                        <p>Certicate Photo</p>
                                        <input type="file" accept=".png, .jpg,.jpeg" onChange={handlePictureChange} name="postGraduPic" className="form-control"></input>
                                    </div>


                                </div>}

                                <div style={{ marginTop: '10px' }} className="form-group">
                                    <label><b>  Speciality: </b></label>
                                    <select name="specialityType" value={data.specialityType} onChange={changeHandler}>
                                        {
                                            specialityType.map((s, i) => (
                                                <option value={s} key={`${s}${i}`}>{s}</option>
                                            ))
                                        }
                                    </select>
                                    <span className="text text-danger"></span>
                                </div>
                                <div style={{ marginTop: '10px' }} className="form-group">
                                    <label><b>  Service Provided: </b></label>
                                    <input type="text" placeholder="" name="servicesProvided" className="form-control"
                                        value={data.servicesProvided} onChange={changeHandler} />
                                    <span className="text text-danger"></span>
                                </div>
                                <div style={{ marginTop: '10px' }} className="form-group">
                                    <label><b>  Service Description: </b></label>
                                    <textarea cols="10" rows="10" type="text" placeholder="" name="specialityDescription" className="form-control"
                                        value={data.specialityDescription} onChange={changeHandler} />
                                    <span className="text text-danger"></span>
                                </div>
                                <div style={{ marginTop: '10px' }} className="form-group">
                                    <label><b>  Speciality Photo: </b></label>
                                    <input type="file" accept=".png, .jpg,.jpeg" onChange={handlePictureChange} name="specialityPic" className="form-control"></input>
                                    <span className="text text-danger"></span>
                                </div>

                                <div style={{ marginTop: '10px' }} className="form-group">
                                    <label><b>  Fees You want to charge: </b></label>
                                    <input type="number" placeholder="" min={10} max={20000} name="fees" className="form-control"
                                        value={data.fees} onChange={changeHandler} />
                                    <span className="text text-danger"></span>
                                </div>


                                <div style={{ marginTop: '10px' }} className="form-group">
                                    <label style={{ "marginTop": "8px" }}><b>Enter You Initial time table : </b></label><br></br>
                                    <label style={{ "marginTop": "8px" }}><b>  Weekday: </b></label>
                                    <input type="text" name="weekday" className="form-control"
                                        value={data.weekday} onChange={changeHandler} />
                                </div>
                                <div style={{ marginTop: '10px' }} className="form-group">
                                    <label><b>  Start Time: </b></label>
                                    <input type="time" name="startTime" className="form-control"
                                        value={data.startTime} onChange={changeHandler} />
                                </div >
                                <div style={{ marginTop: '10px' }} className="form-group">
                                    <label><b>  End Time: </b></label>
                                    <input type="time" name="endTime" className="form-control"
                                        value={data.endTime} onChange={changeHandler} />
                                </div >
                                {/* <div style={{ marginTop: '10px' }} className="form-group">
                                        <label><b>  Slot Duration: </b></label>
                                        <input type="number" name="slotDuration" min={0} className="form-control"
                                            value={data.slotDuration} onChange={changeHandler} />
                                    </div > */}
                                <div style={{ marginTop: '10px' }} className="form-group">
                                    <label><b>  Break Time: </b></label>
                                    <input type="time" name="breakTime" className="form-control"
                                        value={data.breakTime} onChange={changeHandler} />
                                </div >

                                <div style={{ marginTop: '10px' }} className="form-group">
                                    <label style={{ "marginTop": "8px" }}><b>Enter Bank Details :</b></label><br></br>
                                    <label style={{ "marginTop": "8px" }}><b>  Name As Per Bank: </b></label>
                                    <input type="text" name="nameAsPerBank" className="form-control"
                                        value={data.nameAsPerBank} onChange={changeHandler} />
                                </div >
                                <div style={{ marginTop: '10px' }} className="form-group">
                                    <label><b>  Bank name: </b></label>
                                    <input type="text" name="bankName" className="form-control"
                                        value={data.bankName} onChange={changeHandler} />
                                </div >
                                <div style={{ marginTop: '10px' }} className="form-group">
                                    <label><b>  Bank Account No: </b></label>
                                    <input type="text" name="bankAccountNo" className="form-control"
                                        value={data.bankAccountNo} onChange={changeHandler} />
                                </div >

                                <div style={{ marginTop: '10px' }} className="form-group">
                                    <label><b>  IFSC Code: </b></label>
                                    <input type="text" name="IFSC_Code" className="form-control"
                                        value={data.IFSC_Code} onChange={changeHandler} />
                                </div >
                                <div style={{ marginTop: '10px' }} className="form-group">
                                    <label><b>  Pan Card No: </b></label>
                                    <input type="text" name="panCardNo" className="form-control"
                                        value={data.panCardNo} onChange={changeHandler} />
                                </div >




                            </div>}


                        <div style={{ marginTop: "10px" }}>
                            <button className="btn btn-success" onClick={submitData}>Register</button>&emsp;&emsp;
                            <button type="button" className="btn btn-primary" style={{ marginLeft: "10px" }} onClick={refreshPage}>Reset</button>&emsp;
                            <button className="btn btn-danger" onClick={goToHomePage} style={{ marginLeft: "10px" }}>Cancel</button>

                        </div>



                    </div>
                </div>
            </div>
        </div>
    );
}





export default PatientRegistration;