import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../utils/hook";
import AuthMenu from "../authMenu/AuthMenu";
import ProfileMenu from "../profileMenu/ProfileMenu";
import './Header.css';

function Header(props) {
    const auth = useAuth()
    const { user } = useSelector((state) => state.auth)

    return (
        <header className='header' >
            <NavLink to='/' className='logo'>
                <div className='logo__img'></div>
                <h1 className='title'>Сервис проката велосипедов</h1>
            </NavLink>
            {auth && <nav className='nav'>
                <NavLink to='/' className='nav__item'>Главная</NavLink>
                <NavLink to='cases' className='nav__item'>Сообщения о кражах</NavLink>
                <NavLink to='officers' className='nav__item'>Ответственные сотрудники</NavLink>
            </nav>}
            {!auth && <AuthMenu />}
            {auth && <ProfileMenu user={user.data} logOut={props.logOut} />}
        </header>
    )
}

export default Header