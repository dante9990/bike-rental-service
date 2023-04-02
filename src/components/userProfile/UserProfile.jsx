import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { editofficer, getofficer } from "../../store/slice/officer";
import { instanceAuth } from "../../utils/axios";
import EditorProfile from "../editorProfile/EditorProfile";
import './userProfile.css'

function UserProfile() {

    const [visible, setVisible] = useState(false)

    const { id } = useParams()

    const dispatch = useDispatch()

    const editOfficer = async (obj) => {
        await instanceAuth.put(`officers/${id}`, obj)
            .then(response => dispatch(editofficer(response.data.data)))

    }

    useEffect(() => {
        instanceAuth.get(`officers/${id}`)
            .then(response => dispatch(getofficer(response.data.data)))
    }, [])



    const { officer } = useSelector((state) => state.officer)

    return (
        <div className="profile">
            <h3 className="profile__title">Профиль сотрудника</h3>
            <p className="profile__text">{`Имя: ${officer.firstName ? officer.firstName : `--`}`}</p>
            <p className="profile__text">{`Фамилия: ${officer.lastName ? officer.lastName : `--`}`}</p>
            <p className="profile__text">{`Email: ${officer.email}`}</p>
            <p className="profile__text">{officer.approved ? `Одобренный сотрудник` : `Сотрудник`}</p>
            <button className="btn btn__profile" onClick={() => setVisible(true)}>Редактировать сотрудника</button>
            {visible && <EditorProfile setVisible={setVisible} officer={officer} editOfficer={editOfficer} />}
        </div>
    )
}

export default UserProfile