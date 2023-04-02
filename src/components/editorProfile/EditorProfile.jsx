import React, { useState } from "react";
import './editorProfile.css';

function EditorProfile(props) {

    const { setVisible, officer, editOfficer } = props

    const [values, setValues] = useState(
        {
            firstName: officer.firstName,
            lastName: officer.lastName,
            approved: officer.approved
        }
    )

    const handleChange = e => {
        const fieldName = e.target.name
        setValues({ ...values, [fieldName]: e.target.value })
    }

    const checkboxChange = e => {
        setValues({ ...values, [e.target.name]: !values.approved })
    }

    const handleSubmit = e => {
        e.preventDefault()
        editOfficer(values)
        setVisible(false)
    }

    return (
        <div className="editor" onSubmit={handleSubmit}>
            <form className={`editor__form`}>
                <h3 className="editor__title">Редактировать сотрудника</h3>
                <div className="editor__item">
                    <label htmlFor="firstName" className="editor__label">Изменить имя:</label>
                    <input type="text" name="firstName" id="firstName" className="editor__input" value={values.firstName} onChange={handleChange} />
                </div>
                <div className="editor__item">
                    <label htmlFor="lastName" className="editor__label">Изменить Фамилию:</label>
                    <input type="text" name="lastName" id="lastName" className="editor__input" value={values.lastName} onChange={handleChange} />
                </div>
                <div className="editor__item">
                    <input type="checkbox" name="approved" id="approved" className="editor__checkbox" onChange={checkboxChange} checked={values.approved && 'checked'} />
                    <label htmlFor="approved" className="editor__label">Одобрить сотрудника</label>
                </div>
                <div className="btn__container">
                    <button className="btn btn__submit">Редактировать</button>
                    <button className="btn btn__cancel" onClick={() => setVisible(false)}>Отмена</button>
                </div>
            </form>
        </div>
    )
}

export default EditorProfile