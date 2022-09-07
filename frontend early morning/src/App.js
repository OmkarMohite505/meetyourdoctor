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
import AddDoctor from './Components/AddDoctor';
import Patient from './Components/Patient';
import AddArea from './Components/AddArea';
import ViewDoctor from './Components/AdminViewDoctor';
import AdminViewPatient from './Components/AdminViewPatient';
import UpdateDoctor from './Components/UpdateDoctor';
import UpdatePatient from './Components/UpdatePatient';
import SearchDoctor from './Components/SearchDoctor';
import AddState from './Components/AddState';
import AddCity from './Components/AddCity';
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


function App() {

 
  

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
    console.log('Setting page stuff')
    // document.body.dir = currentLanguage.dir || 'ltr'
    document.title = t('app_title')
  }, [currentLanguage, t])

  

  

  


  return (
    <div>

    
   
    <Header title="Connect2YourDoctor" />
    <Icon></Icon>
   

          <Routes>
            <Route path="/" element={<Landing/>}></Route>
            <Route path="/about" element={<About/>}></Route>
            <Route path="/contact" element={<Contact/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/signup" element={<PatientRegistration/>}></Route>
            <Route path="/admin" element={<Admin/>}></Route>
            <Route path="/doctor" element={<Doctor/>}></Route>
            <Route path="/patient" element={<Patient/>}></Route>
            <Route path="/adddoctor" element={<AddDoctor/>}></Route>
            <Route path="/addarea" element={<AddArea/>}></Route>
            <Route path="/addcity" element={<AddCity/>}></Route>
            <Route path="/addstate" element={<AddState/>}></Route>
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
          </Routes>
          <Footer/>
  
  </div>
  );
}

export default App;
