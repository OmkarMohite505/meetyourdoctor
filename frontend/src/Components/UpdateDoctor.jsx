import axios from "axios";
import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import swal from "sweetalert";
import { IP_ADDRS } from "../service/Constant";
import ImageService from "../service/ImageService";

function UpdateDoctor(){


    const navigate = useNavigate();
    // const [state,setState]=useState([]);
    // const [city,setCity]=useState([]);
    // const [area,setArea]=useState([]);

    const [state,setState]=useState("");
    const [city,setCity]=useState("");
    const [area,setArea]=useState("");
    const [pic, setPic] = useState([]);

    
    const [imgFlag, setImgflag] = useState(false);
    const [imageFile, setImageFile] = useState();

    const [data,setData] = useState({
        doctorId:"",
        firstName:"",
        lastName:"",
        mobileNumber:"",
        gender:"",
        dob:"",
        graduation:"",
        postGraduation:"",
        speciality:"",
        fees:"",
        areaId:{},
        loginId:{},
        profilePicture:"",
        jwt:""
    });

    const [Error,setError] = useState({
        first_name_error:"",
        last_name_error:"",
        mobile_number_error:"",
        speciality_error:"",
        fees_error:"",

    });

    const [flag,setFlag]=useState({

        firstName:true,
        lastName:true,
        mobileNumber:true,
        speciality:true,
        fees:true,

    });

    const handleChange=(event)=>{
        setImageFile(event.target.files[0]);
        setImgflag(true);
        console.log(imageFile);
}
    const changeHandler = (e) => {
        setData((data)=>({
            ...data,
            [e.target.name]:e.target.value
        }));
        console.log(e.target.name+" "+e.target.value)
    }

    const refreshPage = (e) => {
        window.location.reload();
      };


    const logout=()=>{
        sessionStorage.removeItem("doctor");
        navigate("/");
    }
 
    useEffect(() => {
        let doc= JSON.parse(sessionStorage.getItem("doctor"));
        setData({doctorId:doc.doctorId,firstName:doc.firstName,lastName:doc.lastName,
            gender:doc.gender,dob:doc.dob,graduation:doc.qualification[0].educationType,postGraduation:doc.qualification[1].educationType,
            speciality:doc.speciality[0].specialityType,fees:doc.fees,mobileNumber:doc.mobileNumber,profilePicture:doc.profilePicture.substring(15),
            jwt:doc.jwt})
             setState(doc.address[0].state);
             setCity(doc.address[0].city);
             setArea(doc.address[0].town);
            //getState();

    },[]);
    useEffect(()=>{
        fetchImage();
    },[data])


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
const validateSpeciality=(e)=>{
    let spec = e.target.value;
    if(spec === ""){
        setError({...Error,speciality_error:"Please enter Speciality"});
        setFlag({...flag,speciality:false});

    }
    else{
        setError({...Error,speciality_error:""});
        setFlag({...flag,speciality:true});

    }
}

const validateFees=(e)=>{
    let fees = e.target.value;
    if(fees === ""){
        setError({...Error,fees_error:"Please enter Fees"});
        setFlag({...flag,fees:false});

    }
    else{
        setError({...Error,fees_error:""});
        setFlag({...flag,fees:true});

    }
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
                    url: `${IP_ADDRS}/api/doctor/profile_picture/${data.doctorId}`,
                    headers: {
                        Authorization: `Bearer ${data.jwt}`,
                        'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
                    },
                    data: form
                };
        
                axios.request(options).then(response => {
                    swal(`${response.data}`,"You can see updated picture after Re-Login", "success");
                    navigate(`/doctor`)
                }).catch(error => {
                    swal("Something went Wrong", "error");
                });
            }
        })

    }

    const fetchImage=()=>{
        const options = {
            method: 'GET',
            url: `${IP_ADDRS}/api/doctor/profile_picture/${data.profilePicture}`,
            headers: {Authorization: `Bearer ${data.jwt}`}
          };
        //   console.log(options.url)
          
          axios.request(options).then(response=>{
            setPic(response.data.image);
          }).catch(error=>{
            // console.error(error);
          });
    }
    
    return(
        <div className="container fluid" style={{marginBottom : "50px"}}>
        <button className="btn btn-danger" onClick={logout} style={{float:"right",marginTop:"10px",marginRight:"10px"}}>Logout</button>
        <button  className='btn btn-secondary' style={{float:"right",marginTop:"10px",marginRight:"10px"}} onClick={() => navigate("/doctor")}>Go Back</button> 
    <br/><br/>
    <div className = "container">
    <div className = "row">
        <div className = "card col-md-6 offset-md-3 offset-md-3">
        <h2 className='text-center'>Update Information </h2>

         <form method="POST">

            <div style={{ marginTop: '10px' }} className = "form-group">
                <label><b>  First Name: </b></label>
                <input type="text"  name="firstName" className="form-control" 
                    value={data.firstName} onChange={changeHandler} onBlur={validateFirstName} readOnly/>
                    <span className="text text-danger">{Error.first_name_error}</span>
            </div>
            <div style={{ marginTop: '10px' }} className = "form-group">
                <label><b>  Last Name: </b></label>
                <input type="text" placeholder={data.lastName} name="lastName" className="form-control" 
                    value={data.lastName} onChange={changeHandler} onBlur={validateLastName} readOnly/>
                    <span className="text text-danger">{Error.last_name_error}</span>
            </div >
            <div style={{ marginTop: '10px' }} className = "form-group">
                <label><b>  Mobile Number: </b></label>
                <input type="text" placeholder={data.mobileNumber} name="mobileNumber" className="form-control" 
                    value={data.mobileNumber} onChange={changeHandler}  onBlur={validateMobileNumber} readOnly/>
                    <span className="text text-danger">{Error.mobile_number_error}</span>
            </div>
             <div style={{ marginTop: '10px' }} className = "form-group" >
                <label><b>  Gender: </b></label> 
                <input style={{ marginLeft: '10px' }} type="radio" value="Male" name="gender" checked={data.gender==='MALE'} disabled/> Male
                <input style={{ marginLeft: '10px' }} type="radio" value="Female" name="gender" checked={data.gender==='FEMALE'} disabled/> Female
                <input style={{ marginLeft: '10px' }} type="radio" value="Other" name="gender" checked={data.gender==='Other'} disabled/> Other
            </div> 

            <div style={{ marginTop: '10px' }} className = "form-group">
                <label><b>  Date of Birth: </b></label>
                <input type="date" placeholder={data.dob} name="dob" className="form-control" 
                    value={data.dob}  disabled/>
            </div >

            <div style={{ marginTop: '10px' }} className = "form-group">
                <label><b>  Graduation: </b></label>
                <input type="text" placeholder={data.graduation} name="graduation" className="form-control" 
                    value={data.graduation} onChange={changeHandler} disabled={true}/>
            </div >

          <div style={{ marginTop: '10px' }} className = "form-group">
                <label><b>  Post Graduation: </b></label>
                <input type="text" placeholder={data.postGraduation} name="postGraduation" className="form-control" 
                    value={data.postGraduation} onChange={changeHandler} disabled/>
            </div >

            <div style={{ marginTop: '10px' }} className = "form-group">
                <label><b>  Speciality: </b></label>
                <input type="text" placeholder={data.speciality} name="speciality"  className="form-control" 
                    value={data.speciality} onChange={changeHandler} onBlur={validateSpeciality} disabled/>
                    <span className="text text-danger">{Error.speciality_error}</span> 
            </div >
            
            <div style={{ marginTop: '10px' }} className = "form-group">
                <label><b>  Fees: </b></label>
                <input type="text" placeholder={data.fees} name="fees" className="form-control" 
                    value={data.fees} onChange={changeHandler} onBlur={validateFees} disabled/>
                    <span className="text text-danger">{Error.fees_error}</span>
            </div >
             <div style={{ marginTop: '10px' }} className = "form-group">
            <label><b>  State: </b></label>
            {/* <p>
                {console.log(state)}
                {console.log(city)}
                {console.log(area)}
            </p> */}
            <input type="text" placeholder={state} className="form-control" 
                    value={state} disabled/>
             <label><b>  City: </b></label>
            <input type="text" placeholder={city} className="form-control" 
                    value={city} disabled/>
            <label><b>  Area: </b></label>
            <input type="text" placeholder={area} className="form-control" 
                    value={area} disabled/>

                    
              
            </div>

            <div style={{ "marginTop": '10px' }} className = "form-group">
            <label><b>  Choose Profile Photo </b></label>
            <input  type="file" accept=".png, .jpg, .jpeg" onChange={handleChange} name="file" className="form-control" ></input>
            </div >

           

            <div style={{marginTop: "10px"}}>
                
            <button className="btn btn-success" onClick={submitData}>Update</button>
            <button type="button" className="btn btn-danger" style={{marginLeft: "10px"}} onClick={refreshPage}>Reset</button>
            <button className="btn btn-danger" onClick={() => navigate("/doctor")} style={{marginLeft: "10px"}}>Cancel</button>

   
            </div>

</form>

        </div>


                    
{imgFlag ?  <img src={URL.createObjectURL(imageFile)} style={{'height':'200px','width':'200px'}}></img>
            :
            //  <img src={`${IP_ADDRS}/api/image/ROLE_DOCTOR/${data.doctorId}`} style={{'height':'400px','width':'400px'}}></img>
             <div className="col-sm-3"><img src={`data:image/jpg;base64,${pic}`} style={{'height':'100px','width':'100px'}}></img></div>
             
             }


        </div>
</div>
    </div>
    );

}
export default UpdateDoctor;

