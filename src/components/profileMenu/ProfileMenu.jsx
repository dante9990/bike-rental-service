import React from "react";
import './profileMenu.css'
import { Link } from "react-router-dom";

function ProfileMenu(props) {

    const { user, logOut } = props

    return (
        <div className="profile-menu">
            <Link to={'/my_profile'} className="profile-menu__user">
                <span className="profile-menu__name">{user.user.firstName}</span>
                <span className="profile-menu__lastname">{user.user.lastName}</span>
                <div className="profile-menu__img"></div>
            </Link>
            <button className="btn btn__profile-menu" onClick={logOut}>X</button>
        </div>
    )
}

export default ProfileMenu