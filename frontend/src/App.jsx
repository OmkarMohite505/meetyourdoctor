import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import PatientRegistration from './Components/PatientRegistration';
import Landing from './Components/Landing';
import Header from './Components/Header';
import Footer from './Components/Footer'
import About from './Components/About';
import Contact from './Components/Contact';
import {BrowserRouter, Routes } from 'react-router-dom';
import{Route} from 'react-router';
import Admin from './Components/Admin';
import Doctor from './Components/Doctor';
// import AddDoctor from './Components/AddDoctor';
import Patient from './Components/Patient';
// import AddArea from './Components/AddArea';
import ViewDoctor from './Components/AdminViewDoctor';
import AdminViewPatient from './Components/AdminViewPatient';
import UpdateDoctor from './Components/UpdateDoctor';
import UpdatePatient from './Components/UpdatePatient';
import SearchDoctor from './Components/SearchDoctor';
// import AddState from './Components/AddState';
// import AddCity from './Components/AddCity';
import UpdateTimeTable from './Components/UpdateTimeTable';
import UpdateTimeTableByDay from './Components/UpdateTimeTableByDay';
import DoctorAppointmentSlot from './Components/DoctorAppointmentSlot';
import DoctorCurrentAppointments from './Components/DoctorCurrentAppointments';
import PatientCurrentAppointments from './Components/PatientCurrentAppointment';
import DoctorAppointmentHistory from './Components/DoctorAppointmentHistory';
import PatientAppointmentHistory from './Components/PatientAppointmentHistory';
import ForgotPassword from './Components/ForgotPassword';
import ChangePasswordDoctor from './Components/ChangePasswordDoctor';
import ChangePasswordPatient from './Components/ChangePasswordPatient';
import axios from 'axios';

import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import cookies from 'js-cookie'
import classNames from 'classnames'
import languages from './Language/language'
import GlobeIcon from './Icon/GlobeIcon'
import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import './Components/CSS/SelectLanguage.css'
import SetTimeTable from './Components/SetTimeTable';
import Pay from './Components/Pay';
import CloseAppointment from './Components/AppointmentModify';
import VerifyDoctor from './Components/VerifyDoctor';
import DoctorDetails from './Components/DoctorDetails';
import DoctorDetailsUnVerify from './Components/DoctorDetailsUnVerify';
import ActiveDoctorList from './Components/ActiveDoctorList';
import DoctorDetailsSuspend from './Components/DoctorDetailsSuspend';
import SuspendedDoctorList from './Components/SuspendedDoctorList';
import DoctorDetailsRemoveSusp from './Components/DoctorDetailsRemoveSusp';
import HomeVideo from './Components/HomeVideo';
import ReactTooltip from 'react-tooltip';


function App() {
  const [id, setId] = useState("");
  
 
  const setItem=()=>sessionStorage.setItem("lngCnt","1");
  setTimeout(setItem,3000);
 

  useEffect(()=>{
   let cnt = sessionStorage.getItem("lngCnt")
   if(cnt === null)
    setId("mydiv")
    else
    setId("");
  },[])
  

  const currentLanguageCode = cookies.get('i18next') || 'en'
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
  const { t } = useTranslation();


  const Icon =()=>{   
    return(
      <div>
         <div className="language-select">
          <div className="d-flex justify-content-end align-items-center language-select-root">
            <div className="dropdown">
              <button
                className="btn btn-link dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <GlobeIcon />
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                  <span className="dropdown-item-text">{t('language')}</span>
                </li>
                {languages.map(({ code, name, country_code }) => (
                  <li key={country_code}>
                    <a
                      href="#"
                      className={classNames('dropdown-item', {
                        disabled: currentLanguageCode === code,
                      })}
                      onClick={() => {
                        i18next.changeLanguage(code)
                      }}
                    >
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
  
    )
   } 

   useEffect(() => {
    // document.body.dir = currentLanguage.dir || 'ltr'
    document.title = t('app_title')
  }, [currentLanguage, t])

  

  

  


  return (
    <div>

    
<ReactTooltip id="select_language_tooltip">Click to Select Language</ReactTooltip>
    <Header title="MeetYourDoctor" />
   <div id={id} data-tip data-for="select_language_tooltip" style={{"float":"right"}}> <Icon></Icon></div>
   

          <Routes>
            <Route path="/" element={<Landing/>}></Route>
            <Route path="/about" element={<About/>}></Route>
            <Route path="/contact" element={<Contact/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/signup" element={<PatientRegistration/>}></Route>
            <Route path="/admin" element={<Admin/>}></Route>
            <Route path="/doctor" element={<Doctor/>}></Route>
            <Route path="/patient" element={<Patient/>}></Route>
            {/* <Route path="/adddoctor" element={<AddDoctor/>}></Route> */}
            {/* <Route path="/addarea" element={<AddArea/>}></Route> */}
            {/* <Route path="/addcity" element={<AddCity/>}></Route> */}
            {/* <Route path="/addstate" element={<AddState/>}></Route> */}
            <Route path="/viewdoctor" element={<ViewDoctor/>}></Route>
            <Route path="/viewpatient" element={<AdminViewPatient/>}></Route>
            <Route path="/updatedoctor" element={<UpdateDoctor/>}></Route>
            <Route path="/updatepatient" element={<UpdatePatient/>}></Route>
            <Route path="/searchdoctor" element={<SearchDoctor/>}></Route>
            <Route path="/updatetimetable" element={<UpdateTimeTable/>}></Route>
            <Route path="/updatetimetablebyday" element={<UpdateTimeTableByDay/>}></Route>
            <Route path="/doctorappointment" element={<DoctorAppointmentSlot/>}></Route>
            <Route path="/doctorcurrentappointments" element={<DoctorCurrentAppointments/>}></Route>
            <Route path="/patientcurrentappointments" element={<PatientCurrentAppointments/>}></Route>
            <Route path="/doctorappointmenthistory" element={<DoctorAppointmentHistory/>}></Route>
            <Route path="/patientappointmenthistory" element={<PatientAppointmentHistory/>}></Route>
            <Route path="/forgotpassword" element={<ForgotPassword/>}></Route>
            <Route path="/changepassworddoctor" element={<ChangePasswordDoctor/>}></Route>
            <Route path="/changepasswordpatient" element={<ChangePasswordPatient/>}></Route>
            <Route path="/set_time_table" element={<SetTimeTable/>}></Route>
            <Route path='/pay' element={<Pay></Pay>}></Route>
            <Route path='/close_appointment' element={<CloseAppointment></CloseAppointment>}></Route>
            <Route path='/verify_doctor' element={<VerifyDoctor></VerifyDoctor>}></Route>
            <Route path='/doctor_details' element={<DoctorDetails></DoctorDetails>}></Route>
            <Route path='/unverify_doctor' element={<DoctorDetailsUnVerify></DoctorDetailsUnVerify>}></Route>
            <Route path='/doctor_list_for_suspend' element={<ActiveDoctorList></ActiveDoctorList>}></Route>
            <Route path='/suspend_doctor' element={<DoctorDetailsSuspend></DoctorDetailsSuspend>}></Route>
            <Route path='/doctor_list_for_suspend' element={<SuspendedDoctorList></SuspendedDoctorList>}></Route>
            <Route path='/suspended_doctor_list' element={<SuspendedDoctorList></SuspendedDoctorList>}></Route>
            <Route path='/remove_suspended_doctor' element={<DoctorDetailsRemoveSusp></DoctorDetailsRemoveSusp>}></Route>
            <Route path='/home_video_upload' element={<HomeVideo></HomeVideo>}></Route>
          </Routes> 
          <Footer/>
  
  </div>
  );
}

export default App;
