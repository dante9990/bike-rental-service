import React, { useState } from "react";
import { CLIENT_ID } from "../../utils/const";
import { useAuth } from "../../utils/hook";
import './signUpForm.css';

function SignUpForm(props) {

    const auth = useAuth()

    const [values, setValues] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        clientId: '',
        approved: false
    })

    const [required, setRequired] = useState(false)


    const handleChange = e => {
        const fieldName = e.target.name
        if (!auth) {
            if (values.clientId === CLIENT_ID) {
                setValues({ ...values, [fieldName]: e.target.value, approved: true })
            } else {
                setValues({ ...values, [fieldName]: e.target.value, approved: false })
            }
        } else {
            setValues({ ...values, [fieldName]: e.target.value })
        }

        if ({ [fieldName]: e.target.value }) {
            setRequired(false)
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (!auth) {
            if (values.email && values.password && values.clientId) {
                props.regSubmit(values)
            } else {
                setRequired(true)
            }
        } else {
            if (values.email && values.password) {
                props.addOfficer(values)
            } else {
                setRequired(true)
            }
        }
        e.target.reset()
    }

    const checkboxChange = e => {
        setValues({ ...values, [e.target.name]: !values.approved })
    }

    return (
        <>
            <form className="signup" onSubmit={handleSubmit}>
                {auth && <button className="btn btn__close" onClick={props.visibleForm}>X</button>}
                <div className="signup__item">
                    <label htmlFor="email" className="signup__label">Email:</label>
                    <input type='email' name="email" id="email" className={`signup__input ${required && 'error'}`} onChange={handleChange} />
                </div>
                <div className="signup__item">
                    <label htmlFor="password" className="signup__label">Пароль:</label>
                    <input type='password' name="password" id="password" className={`signup__input ${required && 'error'}`} onChange={handleChange} />
                </div>
                {!auth && <div className="signup__item">
                    <label htmlFor="clientId" className="signup__label">clientId:</label>
                    <input type='text' name="clientId" id="clientId" className={`signup__input ${required && 'error'}`} onChange={handleChange} />
                </div>}
                <div className="signup__item">
                    <label htmlFor="firstName" className="signup__label">Имя:</label>
                    <input type='text' name="firstName" id="firstName" className={`signup__input`} onChange={handleChange} />
                </div>
                <div className="signup__item">
                    <label htmlFor="lastName" className="signup__label">Фамилия:</label>
                    <input type='text' name="lastName" id="lastName" className={`signup__input`} onChange={handleChange} />
                </div>
                {auth && <div className="signup__item checkbox__container">
                    <label htmlFor="approved" className="signup__label">Одобренный сотрудник</label>
                    <input type='checkbox' name="approved" id="approved" className={`signup__checkbox`} onChange={checkboxChange} />
                </div>}
                {required &&
                    <div className="required">
                        <p>Заполните обязательные поля</p>
                    </div>}
                <button className="btn btn__submit" type="submit" >{props.textBtn}</button>

            </form>
        </>
    )
}

export default SignUpForm