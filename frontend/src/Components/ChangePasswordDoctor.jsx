import axios from "axios";
import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import swal from "sweetalert";
import { IP_ADDRS } from "../service/Constant";

function ChangePasswordDoctor(){

    const [data,setData] = useState({
        currentpass:"",
        newpass:"",
        confirmpass:"",
        passerror:""
    });
    const [passType, setPassType] = useState("password");
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

    const logout=()=>{
        sessionStorage.removeItem("doctor");
        navigate("/");
    }

    const [login, setLogin] = useState({doctorId:"",token:""});


    useEffect(() => {
        let doc= JSON.parse(sessionStorage.getItem("doctor"));
        setLogin({doctorId:doc.doctorId,token:doc.jwt});
    },[]);


    const changeHandler = (e) => {
        setData((data)=>({
            ...data,
            [e.target.name]:e.target.value
        }));
        //console.log(e.target.name+" "+e.target.value)
    }

    const navigate = useNavigate();

    const submitData=(e)=>{
        //console.log(login.user_name+" "+login.user_type);
        e.preventDefault();
        if(data.currentpass === data.newpass)
        {
            setData({passerror : "Current password and new password must be different.. Please enter new password"})
        }
        else if(data.newpass === data.confirmpass){
            if(data.newpass === ""){
                setData({passerror : "New password cannot be null!"})
                return;
            }
            setData({passerror : ""})
            if(true){
                let obj = { "id": login.doctorId, "newPassword": data.newpass };
                const reqOptions = {
                    url: `${IP_ADDRS}/api/doctor/update_password`,
                    method: 'PATCH',
                    headers: {
                        Authorization: `Bearer ${login.token}`,
                        'Content-Type': 'application/json'
                    },
                    data: obj
                }
                axios.request(reqOptions).then(res => {
                    swal(`${res.data}`, "", "success");
                    navigate(`/doctor`);
                })
                    .catch(err => {
                        swal("You Entered Wrong details", "", "error");
                    })
            }
            else{
            }
        }
        else{
            setData({passerror : "New password and confirm password should be same.."})
        }
    }

    return (
        <div className="container container-fluid">
            <button className="btn btn-danger" onClick={logout} style={{float:"right",marginTop:"10px",marginRight:"10px"}}>Logout</button>
            <button  className='btn btn-secondary' style={{float:"right",marginTop:"10px",marginRight:"10px"}} onClick={() => navigate("/doctor")}>Go Back</button> 
            <br/><br/>
            <div className = "container">
            <div className = "row">
                <div className = "card col-md-6 offset-md-3 offset-md-3">
                <h2 className='text-center'>Change Password</h2>

                <form >
                    
                    <div className = "form-group">
                        <label>Current Password: </label>
                        <input type="password" placeholder="Current Password" name="currentpass" className="form-control" 
                            value={data.currentpass} onChange={changeHandler}/>
                            
                    </div >

                    <div className = "form-group">
                        <label>New Password: </label>
                        <input type={passType} placeholder="New Password" name="newpass" className="form-control" 
                            value={data.newpass} onChange={changeHandler}/>
                                                            <span><span><input type="checkbox" checked={isChecked} onChange={handleShowPassword} style={{ 'marginLeft': '150px' }} id="show_new_password"></input>&emsp;</span><label htmlFor="show_new_password">Show Password</label></span>
                            
                    </div >

                    <div className = "form-group">
                        <label>Confirm Password: </label>
                        <input type={passType} placeholder="Confirm Password" name="confirmpass" className="form-control" 
                            value={data.confirmpass} onChange={changeHandler}/>
                                                            <span><span><input type="checkbox" checked={isChecked} onChange={handleShowPassword} style={{ 'marginLeft': '150px' }} id="show_confirm_password"></input>&emsp;</span><label htmlFor="show_confirm_password">Show Password</label></span>
                            
                    </div >
                    <div style={{marginTop: "10px", marginLeft:"180px"}}>
                    <button className="btn btn-success" onClick={submitData}>CHANGE</button>
                    <button className="btn btn-danger" onClick={() => navigate("/doctor")} style={{marginLeft: "10px"}}>Cancel</button> 
                    </div>

                </form>
                <span className="text-danger">
                    {data.passerror}
                </span>
                </div>
                </div>
             </div>
        </div>
);
}
export default ChangePasswordDoctor;