import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { editmessage, getmessage } from "../../store/slice/message";
import { instanceAuth } from "../../utils/axios";
import './messageInfo.css'
import EditorMessage from "../editorMessage/EditorMessage";
import { Link } from "react-router-dom";

function MessageInfo() {

    const [load, setLoad] = useState(true)

    const [edit, setEdit] = useState(false)

    const [form, setForm] = useState(false)

    const { id } = useParams()

    const dispatch = useDispatch()

    const { message } = useSelector((state) => state.message)

    const { officers } = useSelector((state) => state.officers)

    const [resol, setResol] = useState({
        resolution: message.resolution
    })

    const [status, setStatus] = useState({
        status: message.status
    })

    const officerName = officers.find(officer => officer._id === message.officer)

    useEffect(() => {
        instanceAuth.get(`cases/${id}`)
            .then(response => {
                dispatch(getmessage(response.data.data))
            })
    }, [])

    setTimeout(() => {
        setLoad(false)
    }, 1000)

    const editMessage = async (obj) => {
        await instanceAuth.put(`cases/${id}`, obj)
            .then(response => dispatch(editmessage(response.data.data)))
    }

    const resolutionChange = e => {
        const fieldName = e.target.name
        setResol({ ...resol, [fieldName]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        editMessage(resol)
        setForm(false)
    }

    const doneClick = () => {
        setStatus({ ...status, status: 'done' })
        editMessage(status);
    }

    return (
        <>
            {load && <div className="load">
                <div className="load__img"></div>
                <p className="load__text">Подождите...</p>
            </div>}
            {!load && <div className={`message__info ${message.status === 'done' ? 'done' : ''}`}>
                <Link to='/cases' className="message__info_link">К списку</Link>
                <h2 className="message__title">Лицензия №: {message.licenseNumber} </h2>
                <h3 className="message__owner_full_name">ФИО клиента: <br /> {message.ownerFullName}</h3>
                <p className="message__text">Дата кражи: {message.date.slice(0, 10)}</p>
                <p className="message__text">Тип велосипеда: {message.type}</p>
                <p className="message__text">Цвет велосипеда: {message.color}</p>
                <p className="message__text">Ответственный сотрудник: {officerName ? `${officerName.firstName} ${officerName.lastName}` : `--`}</p>
                <p className="message__text">Дополнительная информация: <br />
                    {message.description || `Информация отсутствует`}</p>
                {message.resolution && <p className="message__resolution"> {message.resolution}</p>}
                {form && <form className="resolution__form" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Завершающий комментарий" className="resolution__input"
                        name="resolution" id="resolution" onChange={resolutionChange} />
                    <button className="btn btn__resolution" >ОК</button>
                </form>}
                <div className={`message__btns ${message.status === 'done' ? 'hidden' : ''}`}>
                    <button className="btn btn__edit_message" onClick={() => setEdit(true)}>Редактировать</button>
                    <button className="btn btn__edit_message" onClick={() => setForm(true)} disabled={message.resolution ? 'disabled' : ''}>Принять в обработку</button>
                    <button className="btn btn__done" onClick={doneClick} disabled={!message.resolution ? 'disabled' : ''}>Завершить</button>
                </div>
                <div className="message__dates">
                    <p className="message__date">Созданно: <br />
                        {message.createdAt.slice(0, 10)}</p>
                    <p className="message__date">Обновлено: <br />
                        {message.updatedAt ? message.updatedAt.slice(0, 10) : `--`}</p>
                </div>
            </div>}
            {edit && <EditorMessage message={message} editMessage={editMessage} setEdit={setEdit} />}
        </>

    )
}


export default MessageInfo