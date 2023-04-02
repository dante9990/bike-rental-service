import React, { useState, useEffect } from "react";
import './officers.css'
import { useDispatch, useSelector } from "react-redux";
import SignUpForm from "../signUpForm/SignUpForm";
import { instanceAuth } from "../../utils/axios";
import Officer from "../officer/Officer";
import { addofficer, allofficers, removeofficer } from "../../store/slice/officers";

function Officers() {

  const dispatch = useDispatch()

  const [form, setForm] = useState(true)

  const { officers } = useSelector((state) => state.officers)

  const { user } = useSelector(state => state.auth)

  const visibleForm = () => {
    setForm(!form)
  }

  const addOfficer = async (obj) => {
    try {
      await instanceAuth.post('officers', obj)
        .then(response => {
          dispatch(addofficer(response.data.data))
        })
    } catch (e) {
      alert(e.response.data.message)
    }
  }

  const removeOfficer = async (id) => {
    await instanceAuth.delete(`officers/${id}`)
      .then(() => {
        dispatch(removeofficer(id))
      })
  }

  useEffect(() => {
    instanceAuth.get('officers').then(response => dispatch(allofficers(response.data.officers)))
  }, [])

  return (
    <div className="users">
      {form && <button className="btn btn__add-user" onClick={visibleForm}>Добавить сотрудника</button>}
      {!form && <SignUpForm textBtn="Добавить пользователя" visibleForm={visibleForm} addOfficer={addOfficer} />}
      {officers.map((officer, index) => {
        return (
          <Officer officer={officer} key={officer._id} removeOfficer={removeOfficer} disabled={index === 0 || officer._id === user.data.user.id ? `disabled` : ''} />

        )
      })}

    </div>
  )
}

export default Officers