import React, {useState} from "react";
import './signInForm.css';


function SignInForm(props) {

    const [values, setValues] = useState({
        email: '',
        password: '',
    })

    const handleChange = e => {
        const fieldName = e.target.name
        setValues({ ...values, [fieldName]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (values.email && values.password) {
            props.authSubmit(values)
        }
    }


    return (
        <form className="signin" onSubmit={handleSubmit}>
            <div className="signin__item">
                <label htmlFor="email" className="signin__label">Email:</label>
                <input type='email' name="email" id="email" className="signin__input" onChange={handleChange} />
            </div>
            <div className="signin__item">
                <label htmlFor="password" className="signin__label">Пароль:</label>
                <input type='password' name="password" id="password" className="signin__input" onChange={handleChange} />
            </div>
            <button className="btn btn__submit" type="submit">Войти</button>
        </form>
    )
}

export default SignInForm