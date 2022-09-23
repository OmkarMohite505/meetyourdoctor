import axios from "axios";
import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import swal from "sweetalert";
import { IP_ADDRS } from "../service/Constant";
import ImageService from "../service/ImageService";
import { WebcamCapture } from "./Webcam";

function UpdatePatient(){

    const navigate = useNavigate();

    const [data,setData] = useState({
        patientId:"",
        firstName:"",
        lastName:"",
        mobileNumber:"",
        gender:"",
        dob:"",
        blood_group:"",
        login_id:"",
        profilePicture:"",
        jwt:""
    });

    const [pic, setPic] = useState([]);

    const [Error,setError] = useState({
        first_name_error:"",
        last_name_error:"",
        mobile_number_error:"",
    });

    const [flag,setFlag]=useState({
        firstName:true,
        lastName:true,
        mobileNumber:true,
    });

    const [imgFlag, setImgflag] = useState(false);
    const [imageFile, setImageFile] = useState();
    const [name, setName] = useState('omkar')
    const [email, setEmail] = useState('');
    const [btn, setBtn] = useState(false);
    const [webFile, setWebFile] = useState();

    const setPicture=(e)=>{
        setImageFile(e);
        setImgflag(true);
        console.log(imageFile);
    }

    const handleChange=(event)=>{
        setImageFile(event.target.files[0]);
        setImgflag(true);
        console.log(imageFile);
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

    const changeHandler = (e) => {
        setData((data)=>({
            ...data,
            [e.target.name]:e.target.value
        }));
        console.log(e.target.value)
    }

    const refreshPage = (e) => {
        window.location.reload();
      };


    const logout=()=>{
        sessionStorage.removeItem("patient");
        navigate("/");
    }
 
    useEffect(() => {
        let patient= JSON.parse(sessionStorage.getItem("patient"));
        setData({patientId:patient.patientId,firstName:patient.firstName,lastName:patient.lastName,
            gender:patient.gender,dob:patient.dob,mobileNumber:patient.mobileNumber,blood_group:patient.bloodGroup,
            login_id:patient.loginId, profilePicture:patient.profilePicture.substring(15),
            jwt:patient.jwt})

    },[]);
    useEffect(()=>{
        fetchImage();
    },[data])


    const fetchImage=()=>{
        const options = {
            method: 'GET',
            url: `${IP_ADDRS}/api/patient/profile_picture/${data.profilePicture}`,
            headers: {Authorization: `Bearer ${data.jwt}`}
          };
          console.log(options.url)
          
          axios.request(options).then(response=>{
            setPic(response.data.image);
          }).catch(error=>{
            console.error(error);
          });
    }


    
      const submitData=(e)=>{
        e.preventDefault();

        swal({
            title: "Are you Confirm to Upload Picture?",
            text: "Image Will be upload !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((upload)=>{
            if(upload){
                const formData = new FormData();
                formData.append('imageFile', imageFile)  //1st argumet 'videoFile' name must be matches with spring-boot requeat param name MultipartFile imageFile
        
                const form = new FormData();
                form.append("imageFile", imageFile);
                const options = {
                    method: 'PUT',
                    url: `${IP_ADDRS}/api/patient/profile_picture/${data.patientId}`,
                    headers: {
                        Authorization: `Bearer ${data.jwt}`,
                        'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
                    },
                    data: form
                };
        
                axios.request(options).then(response => {
                    swal(`${response.data}`,"You can see updated picture after Re-Login", "success");
                    navigate(`/patient`);
                }).catch(error => {
                    swal("Something went Wrong","", "error");
                });
            }
        })

    }
    
    return(
        <div className="container fluid">

        <button className="btn btn-danger" onClick={logout} style={{float:"right",marginTop:"10px",marginRight:"10px"}}>Logout</button> 
        <button  className='btn btn-secondary' style={{float:"right",marginTop:"10px",marginRight:"10px"}} onClick={() => navigate("/patient")}>Go Back</button>
    <br/><br/>
   
    <div className = "container">
    <div className = "row">
        <div className = "card col-md-6 offset-md-3 offset-md-3">
        <h2 className='text-center'>Update Information </h2>

         <form method="POST">

            <div style={{ marginTop: '10px' }} className = "form-group">
                <label><b>  First Name: </b></label>
                <input type="text" placeholder={data.firstName} readOnly name="firstName" className="form-control" 
                    value={data.firstName} onChange={changeHandler} onBlur={validateFirstName}/>
                    <span className="text text-danger">{Error.first_name_error}</span>
            </div>
            <div style={{ marginTop: '10px' }} className = "form-group">
                <label><b>  Last Name: </b></label>
                <input type="text" placeholder={data.lastName} readOnly name="lastName" className="form-control" 
                    value={data.lastName} onChange={changeHandler} onBlur={validateLastName}/>
                    <span className="text text-danger">{Error.last_name_error}</span>
            </div >
            <div style={{ marginTop: '10px' }} className = "form-group">
                <label><b>  Mobile Number: </b></label>
                <input type="text" placeholder={data.mobileNumber} readOnly name="mobileNumber" className="form-control" 
                    value={data.mobileNumber} onChange={changeHandler} onBlur={validateMobileNumber}/>
                    <span className="text text-danger">{Error.mobile_number_error}</span>
            </div>
          


            <div style={{ marginTop: '10px' }} className = "form-group" onChange={changeHandler}>
                <label><b>  Gender: </b></label> 
                <input style={{ marginLeft: '10px' }} type="radio" value="Male" name="gender" checked={data.gender==='MALE'} disabled/> Male
                <input style={{ marginLeft: '10px' }} type="radio" value="Female" name="gender" checked={data.gender==='FEMALE'} disabled/> Female
                <input style={{ marginLeft: '10px' }} type="radio" value="Other" name="gender" checked={data.gender==='Other'} disabled/> Other
            </div> 

            <div style={{ marginTop: '10px' }} className = "form-group">
                <label><b>  Date of Birth: </b></label>
                <input type="date" placeholder={data.dob} name="dob" className="form-control" 
                    value={data.dob} onChange={changeHandler} disabled/>
            </div >

            <div style={{ marginTop: '10px' }} className = "form-group">
                <label><b>  Blood Group: </b></label>
                <input type="text" placeholder={data.blood_group} name="graduation" className="form-control" 
                    value={data.blood_group} onChange={changeHandler} disabled={true}/>
            </div >

            <div style={{ marginTop: '10px' }} className = "form-group">
            <label><b>  Choose Profile Photo: </b></label><br></br>
            <input  type="file" accept=".png, .jpg,.jpeg" onChange={handleChange} className="form-control"  name="file"></input>
            </div >

            <div style={{marginTop: "10px"}}>


           
          


            <button className="btn btn-success" onClick={submitData}>Update</button>
            <button type="button" className="btn btn-danger" style={{marginLeft: "10px"}} onClick={refreshPage}>Reset</button>
            <button className="btn btn-danger" onClick={() => navigate("/patient")} style={{marginLeft: "10px"}}>Cancel</button>

            </div>

</form>

        </div>
        </div>
</div>

{/* {btn ?<WebcamCapture setPicture={setPicture}/> :<button onClick={e=>{alert("Capturing photo "+name);setBtn(true)}}>Take Photo</button>} */}


{imgFlag ?  <img src={URL.createObjectURL(imageFile)} style={{'height':'200px','width':'200px'}}></img>
            :
            //  <img src={`${IP_ADDRS}/api/image/ROLE_PATIENT/${data.patientId}`} style={{'height':'400px','width':'400px'}}></img>
             <div className="col-sm-3"><img src={`data:image/jpg;base64,${pic}`} style={{'height':'100px','width':'100px'}}></img></div>
             }

    </div>
    );

}
export default UpdatePatient;

