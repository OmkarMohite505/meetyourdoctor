import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

const Landing = () =>{
    const navigate = useNavigate();
    const [time, setTime] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [date, setDate] = useState({day:"",month:"",year:""});

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(
          (position)=>{setLatitude(position.coords.latitude);setLongitude(position.coords.longitude); }
          );
          interval();
          const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
          const d = new Date();
          setDate({month:months[d.getMonth()],day:d.getDate(), year:d.getFullYear()});
      },[])
  const tick=()=>
  {
      
      setTime(new Date().toLocaleTimeString());
  }
  const interval =()=> setInterval(tick, 1000);

  const getWeatherDetails=()=>{
    const apikey = "0fb34da859a6bf583940533efba926a5";   // replace this by with api
    const wdata ={longitude,latitude};

    function ascii (a) { return String.fromCharCode(a); }

    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`)
       .then(res=>{const temp = Math.round(res.data.main.temp - 273.15); 
      //  alert("Current Temperature : "+temp+ascii(176)+"C\nArea: "+res.data.name+"\nWind Speed: "+res.data.wind.speed+" km/h\nSpace: "+res.data.weather[0].description);
       swal({
        title: "Weather Details",
        text: "Temperature :"+temp+ascii(176)+"C\nArea: "+res.data.name+"\nWind Speed: "+res.data.wind.speed+" km/h\nSpace: "+res.data.weather[0].description,
        icon: "info",
        button: "Ok",
      });
       console.log(res);
      
      
      })
       .catch(err=>alert("error"));
      
  }


    return (
            <div className="container-fluid" style={{marginBottom : "50px"}}>
                 <button onClick={getWeatherDetails} style={{"float":"right","fontSize":"30px","marginTop":"10px","borderRadius":"10px"}}>Get Weather</button><br/>
                    <button style={{"float":"left","marginTop":"0px","fontSize":"40px","fontWeight":"bolder","borderRadius":"15px"}}>{time}</button><br/><br/><br/><br/>
                    <button style={{"float":"left","marginTop":"0px","fontSize":"25px","fontWeight":"bolder","borderRadius":"15px"}}>{date.day}-{date.month}-{date.year} </button>
                <marquee behavior="scroll"  direction="left" scrollamount="10"><p style={{"background":"orange","color":"white","width":"200px"}}>Welcome to our portal</p></marquee>
                <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <video className="videoStyle" autoPlay muted loop style={{"height":"100%","width":"100%"}}>
                                <source src="assets/healthcare.mp4" type="video/mp4" />
                            </video>
                            <div className="middleLayer bg-1" style={{"marginTop":"0px"}}></div>
                            <button className="btn btn-link btn-lg btn-outline-light button1 text-light text-uppercase text-decoration-none mx-3" onClick={() => navigate("/signup")}>SignUp</button>
                                <button className="btn btn-link btn-lg btn-outline-light button1 text-light text-uppercase text-decoration-none mx-3" onClick={() => navigate("/login")}>Login</button>
                            <div className="d-flex flex-column justify-content-center align-items-center w-100 h-100 position-fixed slideContent">
                                <h4 className="text-light font-weight-bolder text-uppercase">Book Appointments</h4>
                                <div className="container w-50">
                                    <p className="display-6 text-light text-center">Book appointments on the go with best specialist doctors in your city.</p>
                                </div>
                                <div>
                               
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}


export default Landing;