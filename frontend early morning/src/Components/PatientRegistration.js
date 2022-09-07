import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function PatientRegistration(){

    const [data,setData] = useState({
        email:"",
        password:"",
        firstName:"",
        lastName:"",
        mobileNumber:"",
        alternateMobileNumber:"",
        gender:"",
        bloodGroup:"",
        dob:"",
        aadharNo:"",
        specialityType:"",
        servicesProvided:"",
        specialityDescription:"",
        specialityPhoto:"",
        fees:"",
        town:"",
        city:"",
        state:"",
        country:"",
        pincode:""
    });

    const [Error,setError] = useState({
        user_name_error:"",
        password_error:"",
        first_name_error:"",
        last_name_error:"",
        mobile_number_error:"",
        gender_error:"",
        blood_group_error:"",
        dob_error:""
    });

    const [flag,setFlag]=useState({
        userName:false,
        password:false,
        firstName:false,
        lastName:false,
        mobileNumber:false,
        gender:false,
        bloodGroup:false,
        dob:false,
    });

    const [cricket, setCricket] = useState(false);
    const [swimming, setSwimming] = useState(false);
    const [holleyboll, setHolleyboll] = useState(false);
    const [hobbies, setHobbies] = useState([]);
    const [patientRole,setPatientRole] = useState(false);
    const [doctorRole, setDoctorRole] = useState(false);
    const [diploma, setDiploma] = useState(false);
    const [graduation, setGraduation] = useState(false);
    const [postGradu, setPostGradu] = useState(false);
    const [role, setRole] = useState("");

    const [diplomaEdu, setDiplomaEdu] = useState({educationType:"",year:"",percentageMarks:"",certificatePhoto:""});
    const [graduationEdu, setGraduationEdu] = useState({educationType:"",year:"",percentageMarks:"",certificatePhoto:""});
    const [postGraduEdu, setPostGraduEdu] = useState({educationType:"",year:"",percentageMarks:"",certificatePhoto:""});

    const setDiplomaData = (e) => {
        console.log(e.target.value)
        console.log(e.target.name)
        setDiplomaEdu((data)=>({
            ...data,
            [e.target.name]:e.target.value
        }));
    }
    const setGraduationData = (e) => {
        console.log(e.target.value)
        console.log(e.target.name)
        setGraduationEdu((data)=>({
            ...data,
            [e.target.name]:e.target.value
        }));
    }
    const setPostGraduData = (e) => {
        console.log(e.target.value)
        console.log(e.target.name)
        setPostGraduEdu((data)=>({
            ...data,
            [e.target.name]:e.target.value
        }));
    }



    const setUserRole=(e)=>{
        console.log(e.target.value);
        setRole(e.target.value);
    }
    useEffect(()=>{
        if(role==="PATIENT"){
            setPatientRole(true);
            setDoctorRole(false);
        }
        if(role==="DOCTOR"){
            setPatientRole(true);
            setDoctorRole(true);
        }
        if(role === "Select Role"){
            setPatientRole(false);
            setDoctorRole(false);
        }

       
    },[role])

    function toggle(value){
        return !value;
      }


    const validateEmail=(e)=> {
        let email = e.target.value;
        let emailRegex = new RegExp( /^[A-Za-z0-9._-]+@[A-Za-z0-9._-]+\.[A-Za-z]{2,4}$/);
        if(emailRegex.test(email) === true ) {
             setError({...Error,user_name_error:""});
             setFlag({...flag,userName:true});

        }
        else {
            setError({...Error,user_name_error: "Email format should be 'abc@gmail.com' and it can include (A-Z a-z 0-9 . _ -)"});
            setFlag({...flag,userName:false});

        }
    }

    const validatePassword=(e)=> {
        let pass = e.target.value;
        let passRegex = new RegExp(  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z]).{8,16}$/);
        if(passRegex.test(pass) === true) {
            setError({...Error,password_error:""});
            setFlag({...flag,password:true});

        }
        else {
           setError({...Error,password_error: "Password must be alphanumeric and should contains at least a special character with min length 8 and max length 16"});
           setFlag({...flag,password:false});

        }
    }

    const validateFirstName=(e)=>{
        let name = e.target.value;
        if(name === ""){
            setError({...Error,first_name_error:"Please enter First Name"});
            setFlag({...flag,firstName:false});

        }
        else{
            setError({...Error,first_name_error:""});
            setFlag({...flag,firstName:true});

        }
    }
    const validateLastName=(e)=>{
        let name = e.target.value;
        if(name === ""){
            setError({...Error,last_name_error:"Please enter Last Name"});
            setFlag({...flag,lastName:false});
            console.log(flag.lastName);

        }
        else{
            setError({...Error,last_name_error:""});
            setFlag({...flag,lastName:true});
            console.log(flag.lastName);

        }
    }
    const validateMobileNumber=(e)=>{
        let mobileNumber = e.target.value;
        let mnRegex = new RegExp(  /^[0-9]{10}$/);
        if(mnRegex.test(mobileNumber) === true){
            setError({...Error,mobile_number_error:""});
            setFlag({...flag,mobileNumber:true});

        }
        else{
            setError({...Error,mobile_number_error:"Mobile Number should be 10 digits without +91 or 0"});
            setFlag({...flag,mobileNumber:false});

        }
    }

    const validateDob=(e)=>{
        let dob = e.target.value;
        if(dob === ""){
            setError({...Error,dob_error:"Please enter BirthDate"});
            setFlag({...flag,dob:false});

        }
        else{
            setError({...Error,dob_error:""});
            setFlag({...flag,dob:true});

        }
    }
    const validateBloodGroup=(e)=>{
        let bg = e.target.value;
        if(bg === ""){
            setError({...Error,blood_group_error:"Please select Blood Group"});
            setFlag({...flag,bloodGroup:false});

        }
        else{
            setError({...Error,blood_group_error:""});
            setFlag({...flag,bloodGroup:true});

        }
    }
    const navigate = useNavigate();

    const changeHandler = (e) => {
        console.log(e.target.value)
        console.log(e.target.name)
        setData((data)=>({
            ...data,
            [e.target.name]:e.target.value
        }));
    }
    const refreshPage = (e) => {
        window.location.reload();
      };
    
      const setPatientHobbies=()=>{
       
        
      }
    const submitData=()=>{
        alert("Submitting data");
        // setPatientHobbies();
        var arr = [];
        alert("Inside")
        if(cricket===true)
        arr.push("CRICKET")
        if(swimming===true)
        arr.push("SWIMMING");
        if(holleyboll===true)
        arr.push("HOLLEYBOLL");
        console.log(arr);

        if(role==="PATIENT")
        {
                const obj = {"email":data.email, "password":data.password,"firstName":data.firstName,
                                "lastName":data.lastName,"mobileNumber":data.mobileNumber,
                                "alternateMobileNumber":data.alternateMobileNumber,"gender":data.gender,
                                "bloodGroup":data.bloodGroup,"dob":data.dob,"hobbies":arr}
                                console.log(obj);
                axios.post("http://localhost:8080/api/patient/register", obj).then(res=>{alert("Success");console.log(res);navigate(`/login`)}).catch(err=>{console.log(err)});
        }

        if(role==="DOCTOR")
        {

            var quali = [];

            if(diploma)
            quali.push(diplomaEdu);
            if(graduation)
            quali.push(graduationEdu);
            if(postGradu)
            quali.push(postGraduEdu);





                const obj = {"email":data.email,       "password":data.password,    "firstName":data.firstName,
                             "lastName":data.lastName,  "mobileNumber":data.mobileNumber,
                             "alternateMobileNumber":data.alternateMobileNumber,     "gender":data.gender,
                             "bloodGroup":data.bloodGroup, "dob":data.dob,           "hobbies":arr,
                             "aadharNo":data.aadharNo,      "fees":data.fees,
                             "speciality":[{"specialityType":data.specialityType,"servicesProvided":data.servicesProvided,"specialityDescription":data.specialityDescription,"specialityPhoto":data.specialityPhoto}],
                             "address":{"town":data.town,"city":data.city,"state":data.state,"country":data.country,"pincode":data.pincode},
                             "qualification":quali
                            }
                                console.log(obj);
                axios.post("http://localhost:8080/api/doctor/register", obj).then(res=>{alert("Success");console.log(res);navigate(`/login`)}).catch(err=>{console.log(err)});
        }

    }
    const option =['PATIENT','DOCTOR'];

    return(
        <div>
        
    <br/><br/>
    <div className = "container" style={{marginBottom : "50px"}}>
    <div className = "row my-4">
        <div className = "card col-md-6 offset-md-3 offset-md-1">
        <h2 className='text-center'>Patient Registration </h2>


        <div className = "form-group">
        <select name='role'  value={role} onChange={(e)=>setUserRole(e)} style={{'width':'150px','height':'40px','borderRadius':'7px','fontSize':'20px','backgroundColor':'skyblue'}}>
        <option >Select Role</option>
        <option value={option[0]} >{option[0]}</option>
        <option value={option[1]} >{option[1]}</option>
       
      </select>

            </div>

           {patientRole && 
           <div>
            
            <div className = "form-group">
                <label><b> Email: </b></label>
                <input type="text" placeholder="Emter Email" name="email" className="form-control" 
                    value={data.email} onChange={changeHandler} onBlur={validateEmail}/>
                    <span className="text text-danger">{Error.user_name_error}</span>

            </div>
            <div style={{ marginTop: '10px' }} className = "form-group">
                <label><b>  Password: </b></label>
                <input type="password" placeholder="Password" name="password" className="form-control" 
                    value={data.password} onChange={changeHandler} onBlur={validatePassword}/>
                    <span className="text text-danger">{Error.password_error}</span>
            </div >
            <div style={{ marginTop: '10px' }} className = "form-group">
                <label><b>  first Name: </b></label>
                <input type="text" placeholder="First Name" name="firstName" className="form-control" 
                    value={data.firstName} onChange={changeHandler} onBlur={validateFirstName}/>
                    <span className="text text-danger">{Error.first_name_error}</span>
            </div>
            <div style={{ marginTop: '10px' }} className = "form-group">
                <label><b>  Last Name: </b></label>
                <input type="text" placeholder="Last Name" name="lastName" className="form-control" 
                    value={data.lastName} onChange={changeHandler} onBlur={validateLastName}/>
                    <span className="text text-danger">{Error.last_name_error}</span>
            </div >
            <div style={{ marginTop: '10px' }} className = "form-group">
                <label><b>  User mobile_number: </b></label>
                <input type="text" placeholder="User mobile_number" name="mobileNumber" className="form-control" 
                    value={data.mobileNumber} onChange={changeHandler} onBlur={validateMobileNumber}/>
                     <span className="text text-danger">{Error.mobile_number_error}</span>
            </div>
            <div style={{ marginTop: '10px' }} className = "form-group">
                <label><b>  Alternate mobile Number: </b></label>
                <input type="text" placeholder="Alternate mobile_number" name="alternateMobileNumber" className="form-control" 
                    value={data.alternateMobileNumber} onChange={changeHandler} onBlur={validateMobileNumber}/>
                     <span className="text text-danger">{Error.mobile_number_error}</span>
            </div>

            <div style={{ marginTop: '10px' }} className = "form-group" onChange={changeHandler} >
                <label><b>  Gender: </b></label>
                <input style={{ marginLeft: '10px' }} type="radio" value="MALE" name="gender" /> Male
                <input style={{ marginLeft: '10px' }} type="radio" value="FEMALE" name="gender" /> Female
                <input style={{ marginLeft: '10px' }} type="radio" value="OTHER" name="gender" /> Other
                <span className="text text-danger">{Error.gender_error}</span>
            </div>
            <div style={{ marginTop: '10px' }} className = "form-group">
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

            <div style={{ marginTop: '10px' }} className = "form-group">
                <label><b>  Date of Birth: </b></label>
                <input type="date" placeholder="Date Of Birth" name="dob" className="form-control" 
                    value={data.dob} onChange={changeHandler} onBlur={validateDob}/>
                    <span className="text text-danger">{Error.dob_error}</span>
            </div >
            <div style={{marginTop:"10px"}} className="form-group">
                <b>Select Hobbies :</b><br></br>
             <input type="checkbox" name="cricket" value='CRICKET' onChange={()=>setCricket(toggle)} id="ad" />&emsp;<label htmlFor="ad">Cricket</label><br></br>
             <input type="checkbox" name="swimming" value='SWIMMING' onChange={()=>setSwimming(toggle)} id="us" />&emsp;<label htmlFor="us">Swimming</label><br></br>
             <input type="checkbox" name="holleyboll" value='HOLLEYBOLL' onChange={()=>setHolleyboll(toggle)} id="sd" />&emsp;<label htmlFor="sd">Holleyboll</label><br/>
            </div>
            
            
            </div>}
            {doctorRole && 
            <div>

                <div style={{ marginTop: '10px' }} className = "form-group">
                    <label><b>  Aadhar Number: </b></label>
                    <input type="text" placeholder="Enter Aadhar Number" name="aadharNo" className="form-control" 
                    value={data.aadharNo} onChange={changeHandler} />
                    <span className="text text-danger">{Error.mobile_number_error}</span>
                </div>
                
                <div style={{marginTop:"10px"}} className="form-group">
                    <b>Select Education :</b><br></br>
                    <input type="checkbox" name="diploma" value='diploma' onChange={()=>setDiploma(toggle)} id="ad" />&emsp;<label htmlFor="ad">Diploma</label><br></br>
                    <input type="checkbox" name="graduation" value='graduation' onChange={()=>setGraduation(toggle)} id="us" />&emsp;<label htmlFor="us">Graduation</label><br></br>
                    <input type="checkbox" name="postGradu" value='postGradu' onChange={()=>setPostGradu(toggle)} id="sd" />&emsp;<label htmlFor="sd">Post Graduation</label><br/>
                </div> 

                {diploma && <div style={{marginTop:"10px"}} className="form-group">
                    <div style={{marginTop:"10px"}} className="form-group">
                        <b>Diploma :</b><br></br>
                        <p>Enter Education Type :</p>
                        <input type="text" name="educationType" value={diplomaEdu.educationType} onChange={setDiplomaData} className="form-control"></input>
                    </div>
                    <div style={{marginTop:"10px"}} className="form-group">
                        <p>Year of Passing</p>
                        <input type="number" name="year" value={diplomaEdu.year} onChange={setDiplomaData} className="form-control"></input>
                    </div>
                    <div style={{marginTop:"10px"}} className="form-group">
                        <p>Marks</p>
                        <input type="number" name="percentageMarks" value={diplomaEdu.percentageMarks} onChange={setDiplomaData} className="form-control"></input>
                    </div>
                    
                    <div style={{marginTop:"10px"}} className="form-group">
                        <p>Certicate Photo</p>
                        <input type="text" name="certificatePhoto" value={diplomaEdu.certificatePhoto} onChange={setDiplomaData} className="form-control"></input>
                    </div>
               
                </div>} 

                {graduation && <div style={{marginTop:"10px"}} className="form-group">
                    <div style={{marginTop:"10px"}} className="form-group">
                        <b>Graduation :</b><br></br>
                        <p>Enter Graduation Type :</p>
                        <input type="text" name="educationType" value={graduationEdu.educationType} onChange={setGraduationData} className="form-control"></input>
                    </div>

                    <div style={{marginTop:"10px"}} className="form-group">
                        <p>Year of Passing</p>
                        <input type="number" name="year" value={graduationEdu.year} onChange={setGraduationData} className="form-control"></input>
                    </div>

                    <div style={{marginTop:"10px"}} className="form-group">
                        <p>Marks</p>
                        <input type="number" name="percentageMarks" value={graduationEdu.percentageMarks} onChange={setGraduationData} className="form-control"></input>
                    </div>
                        
                    <div style={{marginTop:"10px"}} className="form-group">
                        <p>Certicate Photo</p>
                        <input type="text" name="certificatePhoto" value={graduationEdu.certificatePhoto} onChange={setGraduationData} className="form-control"></input>
                    </div>
               
                </div>} 

                {postGradu && <div style={{marginTop:"10px"}} className="form-group">
                    <div style={{marginTop:"10px"}} className="form-group">
                        <b>Post Graduation :</b><br></br>
                        <p>Enter PostGraduation Type :</p>
                        <input type="text" name="educationType" value={postGraduEdu.educationType} onChange={setPostGraduData} className="form-control"></input>
                    </div>

                    <div style={{marginTop:"10px"}} className="form-group">
                        <p>Year of Passing</p>
                        <input type="number" name="year" value={postGraduEdu.year} onChange={setPostGraduData} className="form-control"></input>
                    </div>

                    <div style={{marginTop:"10px"}} className="form-group">
                        <p>Marks</p>
                        <input type="number" name="percentageMarks" value={postGraduEdu.percentageMarks} onChange={setPostGraduData} className="form-control"></input>
                    </div>

                    <div style={{marginTop:"10px"}} className="form-group">
                        <p>Certicate Photo</p>
                        <input type="text" name="certificatePhoto" value={postGraduEdu.certificatePhoto} onChange={setPostGraduData} className="form-control"></input>
                    </div>

               
                </div>} 

                <div style={{ marginTop: '10px' }} className = "form-group">
                    <label><b>  Speciality: </b></label>
                    <input type="text" placeholder="" name="specialityType" className="form-control" 
                    value={data.specialityType} onChange={changeHandler} />
                    <span className="text text-danger">{Error.mobile_number_error}</span>
                </div>
                <div style={{ marginTop: '10px' }} className = "form-group">
                    <label><b>  Service Provided: </b></label>
                    <input type="text" placeholder="" name="servicesProvided" className="form-control" 
                    value={data.servicesProvided} onChange={changeHandler} />
                    <span className="text text-danger">{Error.mobile_number_error}</span>
                </div>
                <div style={{ marginTop: '10px' }} className = "form-group">
                    <label><b>  Service Description: </b></label>
                    <input type="text" placeholder="" name="specialityDescription" className="form-control" 
                    value={data.specialityDescription} onChange={changeHandler} />
                    <span className="text text-danger">{Error.mobile_number_error}</span>
                </div>
                <div style={{ marginTop: '10px' }} className = "form-group">
                    <label><b>  Speciality Photo: </b></label>
                    <input type="text" placeholder="" name="specialityPhoto" className="form-control" 
                    value={data.specialityPhoto} onChange={changeHandler} />
                    <span className="text text-danger">{Error.mobile_number_error}</span>
                </div>

                <div style={{ marginTop: '10px' }} className = "form-group">
                    <label><b>  Fees You want to charge: </b></label>
                    <input type="number" placeholder="" name="fees" className="form-control" 
                    value={data.fees} onChange={changeHandler} />
                    <span className="text text-danger">{Error.mobile_number_error}</span>
                </div>

                <div style={{ marginTop: '10px' }} className = "form-group">
                    <label><b> Address: </b></label>
                    <label><p> Town: </p></label>
                    <input type="text" placeholder="" name="town" className="form-control" 
                    value={data.town} onChange={changeHandler} />
                    <span className="text text-danger">{Error.mobile_number_error}</span>
                </div>
                <div style={{ marginTop: '10px' }} className = "form-group">
                    <label><p> City: </p></label>
                    <input type="text" placeholder="" name="city" className="form-control" 
                    value={data.city} onChange={changeHandler} />
                    <span className="text text-danger">{Error.mobile_number_error}</span>
                </div>
                <div style={{ marginTop: '10px' }} className = "form-group">
                    <label><p> State: </p></label>
                    <input type="text" placeholder="" name="state" className="form-control" 
                    value={data.state} onChange={changeHandler} />
                    <span className="text text-danger">{Error.mobile_number_error}</span>
                </div>
                <div style={{ marginTop: '10px' }} className = "form-group">
                    <label><p> Country: </p></label>
                    <input type="text" placeholder="" name="country" className="form-control" 
                    value={data.country} onChange={changeHandler} />
                    <span className="text text-danger">{Error.mobile_number_error}</span>
                </div>
                <div style={{ marginTop: '10px' }} className = "form-group">
                    <label><p> PinCode: </p></label>
                    <input type="text" placeholder="" name="pincode" className="form-control" 
                    value={data.pincode} onChange={changeHandler} />
                    <span className="text text-danger">{Error.mobile_number_error}</span>
                </div>

                
            </div>}


            <div style={{marginTop: "10px"}}>
            <button className="btn btn-success" onClick={submitData}>Register</button>
            <button type="button" className="btn btn-primary" style={{marginLeft: "10px"}} onClick={refreshPage}>Reset</button>
            <button className="btn btn-danger" onClick={() => navigate("/")} style={{marginLeft: "10px"}}>Cancel</button> 
   
            </div>



        </div>
        </div>
</div>
    </div>
    );
}





export default PatientRegistration;