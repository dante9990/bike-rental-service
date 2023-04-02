import React, { useState } from "react";
import './editorMessage.css'
import { useSelector } from "react-redux";


function EditorMessage(props) {

    const { message, editMessage, setEdit } = props

    const { users } = useSelector((state) => state.users)

    const trueUsers = users.filter(user => user.approved)

    const [values, setValues] = useState({
        licenseNumber: message.licenseNumber,
        ownerFullName: message.ownerFullName,
        type: message.type,
        color: message.color,
        date: new Date(message.date),
        officer: message.officer,
        description: message.description,
    })

    const handleChange = e => {
        const fieldName = e.target.name
        setValues({ ...values, [fieldName]: e.target.value })
    }

    const dateChange = e => {
        const newDate = new Date(e.target.value)
        setValues({ ...values, [e.target.name]: newDate })
    }

    const handleSubmit = e => {
        e.preventDefault()
        editMessage(values)
        setEdit(false)
    }

    return (
        <div className="editor">
            <form className="form_message__editor" onSubmit={handleSubmit}>
                <div className="form_message__item">
                    <label htmlFor="licenseNumber" className="form_message__label">Номер лицензии:</label>
                    <input type='text' name="licenseNumber" id="licenseNumber" className="form_message__input" value={values.licenseNumber} onChange={handleChange} />
                </div>
                <div className="form_message__item">
                    <label htmlFor="ownerFullName" className="form_message__label">ФИО клиента:</label>
                    <input type='text' name="ownerFullName" id="ownerFullName" className="form_message__input" value={values.ownerFullName} onChange={handleChange} />
                </div>
                <div className="form_message__item">
                    <label htmlFor="type" className="form_message__label">Тип велосипеда:</label>
                    <select name="type" id="type" className="form_message__select" value={values.type} onChange={handleChange}>
                        <option value={''}>--</option>
                        <option value={'general'}>General</option>
                        <option value={'sport'}>Sport</option>
                    </select>
                </div>
                <div className="form_message__item">
                    <label htmlFor="color" className="form_message__label">Цвет велосипеда:</label>
                    <input type='text' name="color" id="color" className="form_message__input" value={values.color} onChange={handleChange} />
                </div>
                <div className="form_message__item">
                    <label htmlFor="date" className="form_message__label">Дата кражи:</label>
                    <input type='date' name="date" id="date" className="form_message__input"
                        value={values.date.toISOString().slice(0, 10)} max={values.date.toISOString().slice(0, 10)} onChange={dateChange} />
                </div>
                <div className="form_message__item">
                    <label htmlFor="officer" className="form_message__label">Одобренные сотрудники:</label>
                    <select name="officer" id="officer" className="form_message__select" value={values.officer} onChange={handleChange}>
                        <option value={''}>--</option>
                        {trueUsers.map(officer => {
                            return (
                                <option value={officer._id} key={officer._id}>{officer.firstName} {officer.lastName}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="form_message__item description">
                    <label htmlFor="description" className="form_message__label">Дополнительная информация:</label>
                    <textarea name="description" id="description" className="form_message__textarea" value={values.description} onChange={handleChange} />
                </div>
                <button className="btn btn__submit-message" type="submit">Редактировать</button>
            </form>
        </div>
    )
}

export default EditorMessage