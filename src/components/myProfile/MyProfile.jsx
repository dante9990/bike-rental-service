import React from "react";
import './myProfile.css'
import { useDispatch, useSelector } from "react-redux";
import Message from "../message/Message";
import { instanceAuth } from "../../utils/axios";
import { removemessage } from "../../store/slice/messages";

function MyProfile(props) {

    const { user } = props

    const dispatch = useDispatch()

    const { messages } = useSelector((state) => state.messages)

    const myMessages = messages.filter(m => m.officer === user.user.id)

    const removeMessage =  (id) => {
         instanceAuth.delete(`cases/${id}`)
            .then(() => {
                dispatch(removemessage(id))
            })
    }

    return (
        <>
            {user && <div className="my-profile">

                <h2 className="my-profile__title">{user.user.approved ? 'Ответственный сотрудник' : 'Сотрудник'} <br /> {user.user.firstName} {user.user.lastName} </h2>
                <p className="my-profile__text">email: {user.user.email}</p>
                <div className="my-profile__messages">
                    {myMessages && myMessages.map(message => {
                        return (
                            <Message key={message._id} message={message} removeMessage={removeMessage} />
                        )
                    })}
                </div>
            </div>}
        </>
    )
}

export default MyProfile