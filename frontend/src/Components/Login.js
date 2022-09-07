import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { loadCaptchaEnginge,validateCaptcha,LoadCanvasTemplate } from "react-simple-captcha";
import swal from "sweetalert";

function Login(){
    const [data,setData] = useState({
        username:"",
        password:"",
        loginerror:""
    });


    useEffect(()=>{
        loadCaptchaEnginge(6,'red','black','upper'); 
       },[])


    const changeHandler = (e) => {
        setData((data)=>({
            ...data,
            [e.target.name]:e.target.value
        }));
    }

    const navigate = useNavigate();

    const submitData=(e)=>{
        if(data.username == '') {
            alert('Username cannot be null');
            return;
        }
        if(data.password == '') {
            alert('Password cannot be null');
            return;
        }
        e.preventDefault();
       /*  const reqOptions ={
            method : 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body : JSON.stringify({
                user_name: data.username,
                password: data.password
            })
        }
        fetch("http://localhost:8080/logincheck",reqOptions)
        .then(resp=>resp.text())
        .then(data=> {if(data.length != 0)
            {
                const json = JSON.parse(data);
                if(json.login_id.user_type == "Patient"){
                    sessionStorage.setItem("patient",JSON.stringify(json))
                    navigate('/patient');
                }
                    
                if(json.login_id.user_type == "Doctor"){
                    sessionStorage.setItem("doctor",JSON.stringify(json))
                    navigate('/doctor');
                }
                
                if(json.user_type == "Admin"){
                    sessionStorage.setItem("admin",JSON.stringify(json))
                    navigate('/admin');
                }
            }
            else{
            //setData({loginerror:"Wrong Username or Password (or account may be disabled)! Try Again..."})
            alert("Wrong Username or Password (or account may be disabled)! Try Again...");
            }
        }) */



        let user_captcha = document.getElementById('user_captcha_input').value;

        if (validateCaptcha(user_captcha)===true) {
            // if(true){
         //    alert('Captcha Matched');
         //    loadCaptchaEnginge(6); 
         const obj = {"email":data.username,"password":data.password}
         axios.post("http://localhost:8080/api/signwo", obj)
         .then(response=>{
             if(response.data.roles.includes("ROLE_PATIENT")){
                 sessionStorage.setItem("patient", JSON.stringify(response.data));
                 navigate(`/patient`);
             }
             if(response.data.roles.includes("ROLE_DOCTOR")){
                 sessionStorage.setItem("doctor", JSON.stringify(response.data));
                 navigate(`/doctor`);
             }
         })
        }
 
        else {
            swal("Captcha Does Not Match !","Enter Correct Captcha", "error");
            // document.getElementById('user_captcha_input').value = "";
        }









       

    }




    return (
        <div>
            <br/><br/>
            <div className = "container">
            <div className = "row">
                <div className = "card col-md-6 offset-md-3 offset-md-3">
                <h2 className='text-center'>Login</h2>

                <form >
                    <div className = "form-group">
                        <label> Email Id: </label>
                        <input type="email" placeholder="Enter Email ID" name="username" className="form-control" 
                            value={data.username} onChange={changeHandler}/>
                            
                    </div>
                    <div className = "form-group">
                        <label> Password: </label>
                        <input type="password" placeholder="Password" name="password" className="form-control" 
                            value={data.password} onChange={changeHandler}/>
                            
                    </div >

                    <div className = "form-group" style={{"marginTop":"20px","marginLeft":"30px"}}>
                        <LoadCanvasTemplate  />
                    </div >
                    <div className = "form-group">
                        <label> Enter Captcha: </label>
                        <input type="text" placeholder="Enter Captcha" id="user_captcha_input" name="user_captcha_input" className="form-control" 
                           />
                    </div >




                   

                    <div style={{marginTop: "10px", marginLeft:"200px"}}>
                    <button className="btn btn-success" onClick={submitData}>Login</button>
                    <button className="btn btn-danger" onClick={() => navigate("/")} style={{marginLeft: "10px"}}>Cancel</button> 
                    </div>

                </form>
                <a href="/forgotpassword">Forgot password? click here...</a>
                <p className="text-danger">{data.loginerror}</p>
                </div>
                </div>
             </div>
        </div>


);
}

export default Login;