import React from "react";
import { Link } from "react-router-dom";
import './officer.css'
import { useSelector } from "react-redux";

function Officer(props) {
    const { officer, removeOfficer, disabled } = props

    const { user } = useSelector(state => state.auth)

    const handleRemove = () => {
        removeOfficer(officer._id)
    }

    return (
        <div className="user">
            <Link to={`${officer._id === user.data.user.id ? `/my_profile` : `/officers/${officer._id}`} `} className='user__name'>
                {officer.firstName && officer.lastName ? `${officer.firstName} ${officer.lastName}` 
            : `${officer.email}`}</Link>
            <button className="btn btn__delete" onClick={handleRemove} disabled={disabled}>Х</button>
        </div>
    )
}

export default Officer