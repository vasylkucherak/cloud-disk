import React from 'react';
import {NavLink} from "react-router-dom";

import './navbar.css';
import Logo from '../../assets/img/logo.svg';

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="container">
                <div className="navbar__logo">
                    <NavLink to="/">
                        <img src={Logo} alt="logo"/>
                        <div className="navbar__header">UFO Cloud</div>
                    </NavLink>
                </div>
                <div className="navbar__login"><NavLink to="/login">Вхід</NavLink></div>
                <div className="navbar__registration"><NavLink to="/registration">Реєстрація</NavLink></div>
            </div>
        </div>
    );
};

export default Navbar
