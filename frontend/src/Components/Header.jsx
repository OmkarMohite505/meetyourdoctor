import React from 'react';
import { NavLink } from 'react-router-dom';

import { useTranslation,initReactI18next } from "react-i18next";


export default function Header(props) {
    const {t} = useTranslation();
    
    // let { title } = props;
    let loggedIn = JSON.parse(sessionStorage.getItem("loginState"));
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <div className="navbar-header">
                    <NavLink className="navbar-brand" to="/">{t('app_title')}</NavLink>
                </div>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item"><NavLink className="nav-link active" to="/">{t('home')}</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="/about">{t('about_us')}</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="/contact">{t('contact_us')}</NavLink></li>
                </ul>
            </div>
        </nav>
         
    )
}

