import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import ReactTooltip from 'react-tooltip';
import '../Components/CSS/HomeButton.css'
import { useTranslation,initReactI18next } from "react-i18next";
import '../Components/CSS/Time.css';

const Landing = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [time, setTime] = useState("");
    const [latitude, setLatitude] = useState(18.5204);
    const [longitude, setLongitude] = useState(73.8567);
    const [date, setDate] = useState({ day: "", month: "", year: "" });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => { setLatitude(position.coords.latitude); setLongitude(position.coords.longitude); }
        );
        interval();
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const d = new Date();
        setDate({ month: months[d.getMonth()], day: d.getDate(), year: d.getFullYear() });
    }, [])
    const tick = () => {

        setTime(new Date().toLocaleTimeString());
    }
    const interval = () => setInterval(tick, 1000);

    const getWeatherDetails = () => {
        const apikey = "your_api_key";   // replace this by with api
        const wdata = { longitude, latitude };

        function ascii(a) { return String.fromCharCode(a); }

        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`)
            .then(res => {
                const temp = Math.round(res.data.main.temp - 273.15);
                //  alert("Current Temperature : "+temp+ascii(176)+"C\nArea: "+res.data.name+"\nWind Speed: "+res.data.wind.speed+" km/h\nSpace: "+res.data.weather[0].description);
                swal({
                    title: "Weather Details",
                    text: "Temperature :" + temp + ascii(176) + "C\nArea: " + res.data.name + "\nWind Speed: " + res.data.wind.speed + " km/h\nSpace: " + res.data.weather[0].description,
                    icon: "info",
                    button: "Ok",
                });
                console.log(res);


            })
            .catch(err => alert("error"));

    }


    return (
        <div className="container-fluid" style={{ marginBottom: "50px" }}>
            <button onClick={getWeatherDetails} style={{ "float": "right", "fontSize": "20px", "marginTop": "10px", "borderRadius": "10px" }}>{t('weather_info')}</button><br />
            <button id='time'>{time}</button><br /><br /><br /><br />
            <button style={{ "float": "left", "marginTop": "0px", "fontSize": "20px", "fontWeight": "bolder", "borderRadius": "15px" }}>{date.day}-{date.month}-{date.year} </button>
            <marquee behavior="scroll" direction="left" scrollamount="10"><p style={{ "background": "orange", "color": "white", "width": "250px","fontWeight":"bolder" }}>{t('welcome_to_our_portal')}</p></marquee><br/>

            <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <video className="videoStyle" autoPlay muted loop style={{ "height": "100%", "width": "100%" }}>
                            <source src="assets/healthcare.mp4" type="video/mp4" />
                        </video>
                        <div className="middleLayer bg-1" ></div><br/><br/>
                        <ReactTooltip  id='signup_tool_tip'>{t('click_here_register_tooltip')}</ReactTooltip>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                        <button data-tip data-for='signup_tool_tip' className="button-43" onClick={() => navigate("/signup")} style={{"marginLeft":"200px"}}>{t('register')}</button>&emsp;&emsp;&emsp;&emsp;
                        <ReactTooltip id='login_tool_tip'>{t('click_here_login_tooltip')}</ReactTooltip>
                        <button data-tip data-for='login_tool_tip' className="button-43" onClick={() => navigate("/login")} style={{"marginLeft":"300px"}}>{t('login')}</button><br /><br /><br /><br />
                        <p className="display-6 text-light text-center" style={{"marginTop":"130px"}}>{t('landing_page_headline_text')}</p>
                        <button data-tip data-for='' className="button-43" onClick={() => navigate("/login")} style={{"marginLeft":"550px","marginTop":"0px","width":"400px"}}>{t('book_appointment_landing')}</button><br />
                        <div className="d-flex flex-column justify-content-center align-items-center w-100 h-100 position-fixed slideContent">

                            <div className="container w-50">
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