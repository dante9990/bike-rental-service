import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addmessage } from "../../store/slice/messages";
import { instance, instanceAuth } from "../../utils/axios";
import { CLIENT_ID } from "../../utils/const";
import { useAuth } from "../../utils/hook";
import './formMessage.css';

function FormMessage() {

    const date = new Date()

    const auth = useAuth()

    const { officers } = useSelector((state) => state.officers)

    const trueUsers = officers.filter(officer => officer.approved)

    const dispatch = useDispatch()

    const [values, setValues] = useState({
        status: 'new',
        licenseNumber: '',
        ownerFullName: '',
        type: '',
        clientId: CLIENT_ID,
        color: '',
        date: '',
        officer: '',
        description: '',
    })

    const handleChange = e => {
        const fieldName = e.target.name
        setValues({ ...values, [fieldName]: e.target.value })
    }

    const dateChange = e => {
        const newDate = new Date(e.target.value)
        setValues({...values, [e.target.name]: newDate})
    }

    const addMessage = (obj) => {
        if(!auth) {
            try {
                 instance.post('public/report', obj)
                    .then(response => dispatch(addmessage(response.data.data)))
            } catch (e) {
                alert(e.response.data.message)
            }
        } else {
            try {
                 instanceAuth.post('cases', obj)
                    .then(response => dispatch(addmessage(response.data.data)))
            } catch (e) {
                alert(e.response.data.message)
            }
        }

    }

    const handleSubmit = e => {
        e.preventDefault()
        addMessage(values)
    }

    return (
        <form className="form_message" onSubmit={handleSubmit}>
            <div className="form_message__item">
                <label htmlFor="licenseNumber" className="form_message__label">Номер лицензии:</label>
                <input type='text' name="licenseNumber" id="licenseNumber" className="form_message__input" onChange={handleChange} />
            </div>
            <div className="form_message__item">
                <label htmlFor="ownerFullName" className="form_message__label">ФИО клиента:</label>
                <input type='text' name="ownerFullName" id="ownerFullName" className="form_message__input" onChange={handleChange} />
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
                <input type='text' name="color" id="color" className="form_message__input" onChange={handleChange} />
            </div>
            <div className="form_message__item">
                <label htmlFor="date" className="form_message__label">Дата кражи:</label>
                <input type='date' name="date" id="date" className="form_message__input"
                    max={date.toISOString().slice(0, 10)} onChange={dateChange} />
            </div>
            {auth && <div className="form_message__item">
                <label htmlFor="officer" className="form_message__label">Одобренные сотрудники:</label>
                <select name="officer" id="officer" className="form_message__select" value={values.officer} onChange={handleChange}>
                    <option value={''}>--</option>
                    {trueUsers.map(officer =>{
                        return (
                            <option value={officer._id} key={officer._id}>{officer.firstName} {officer.lastName}</option>
                        )
                    })}
                </select>
            </div>}
            <div className="form_message__item">
                <label htmlFor="description" className="form_message__label">Дополнительная информация:</label>
                <textarea name="description" id="description" className="form_message__textarea" onChange={handleChange} />
            </div>
            <button className="btn btn__submit-message">Отправить</button>
        </form>
    )
}

export default FormMessage