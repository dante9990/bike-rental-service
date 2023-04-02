import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allmessages, removemessage } from "../../store/slice/messages";
import { instanceAuth } from "../../utils/axios";
import Message from "../message/Message";
import './messages.css'

function Messages() {

    const dispatch = useDispatch()

    useEffect(() => {
        instanceAuth.get('cases').then(response => dispatch(allmessages(response.data.data)))
    }, [])

    const removeMessage = async (id) => {
        await instanceAuth.delete(`cases/${id}`)
        .then(() => {
            dispatch(removemessage(id))
        })
    }

    const { messages } = useSelector((state) => state.messages)

    return (
        <div className="messages">
            {messages.map(message => {
                return (
                    <Message key={message._id} message={message} removeMessage={removeMessage} />
                )
            })}
        </div>
    )
}

export default Messages