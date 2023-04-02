import React from "react";
import './authMenu.css';
import { Link } from "react-router-dom";
import LinkButton from "../linkButton/LinkButton";

function AuthMenu() {
    return (
        <div className='auth'>
            <Link to="auth/sign_up" className='auth__link'>Регистрация</Link>
            <div className='vertical_line'></div>
            <LinkButton path="auth/sign_in" selector="btn__auth" text="Войти" />
        </div>
    )
}

export default AuthMenu