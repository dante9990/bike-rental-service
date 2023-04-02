import React from "react";
import './notAuth.css'
import { Link } from "react-router-dom";


function NotAuth() {
    return (
        <>
            <div className="not-auth">
                <h2>Вы не авторизованны...</h2>
                <div className="not-auth__img"></div>
                <Link to={'/'}>На главную</Link>
            </div>
        </>
    )
}

export default NotAuth