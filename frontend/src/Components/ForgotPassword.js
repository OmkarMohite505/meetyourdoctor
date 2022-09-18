import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import swal from "sweetalert";
import { IP_ADDRS } from "../service/Constant";

function ForgotPassword(){

    const [data,setData] = useState({
        email:"",
        otp:"",
        newPassword:""
    });

    const [otpFlag, setOtpFlag] = useState(false);
    const [waitOTP, setWaitOTP] = useState(false);
    const [sendOTPButton,setSendOTPButton] = useState(true);
    const [waitLockFlag,setWaitLockFlag] = useState(true);


    const changeHandler = (e) => {
        setData((data)=>({
            ...data,
            [e.target.name]:e.target.value
        }));
    }

    const navigate = useNavigate();

    const changeFlag=()=>{
        setWaitLockFlag(false);
    }

    const updatePassword=(e)=>{
        e.preventDefault();

        const obj = {"email":data.email, "otp":data.otp,"newPassword":data.newPassword};
        axios.patch(`${IP_ADDRS}/api/update_password`, obj)
                  .then(res=>{navigate(`/login`)})
                  .catch(err=>{
                    swal("Enter Correct Details","","error");
                  })
    }
    

    const submitData=(e)=>{
        e.preventDefault();
        changeFlag();
        if(data.email == '') {
            swal("Email Field Empty","Enter Valid Email", "error");
            return;
        }
        const obj = {"email":data.email}

       axios.patch(`${IP_ADDRS}/api/send_otp`, obj)
            .then(res=>{setWaitOTP(true);})
            .catch(err=>{setWaitLockFlag(true);
                console.log("Error");
            })
    }




    return (
        <div>
            <br/><br/>
            <div className = "container">
            <div className = "row">
                <div className = "card col-md-6 offset-md-3 offset-md-3">
                <h2 className='text-center'>OTP will sent To Email</h2>

                <form >
                    <div className = "form-group">
                        <label> Enter your registered emailId: </label>
                        <input type="email" placeholder="Enter Email ID" name="email" className="form-control" 
                            value={data.email} onChange={changeHandler}/>
                            
                    </div>

                    {waitOTP && <div><div className = "form-group">
                        <label> Enter OTP: </label>
                        <input type="number" placeholder="Enter OTP" name="otp" className="form-control" 
                            value={data.otp} onChange={changeHandler}/>
                            
                    </div>

                    <div className = "form-group">
                        <label> Enter New Password: </label>
                        <input type="password" placeholder="Enter New Password" name="newPassword" className="form-control" 
                            value={data.newPassword} onChange={changeHandler}/>
                            
                    </div></div>}

                    <div style={{marginTop: "10px", marginLeft:"200px"}}>
                   {waitLockFlag &&  <button className="btn btn-success" onClick={submitData}>SEND OTP</button>}
                   {waitOTP &&  <button className="btn btn-success" onClick={submitData}>RE-SEND OTP</button>}
                   {waitOTP &&  <button className="btn btn-success" onClick={updatePassword}>Update Password</button>}
                    <button className="btn btn-danger" onClick={() => navigate("/login")} style={{marginLeft: "10px"}}>Cancel</button> 
                    </div>

                </form>
                </div>
                </div>
             </div>
        </div>

);
}
export default ForgotPassword;