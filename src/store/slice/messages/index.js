import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: []
}

export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addmessage(state, action) {
            state.messages = [...state.messages, action.payload]
        },
        allmessages(state,action) {
            state.messages = action.payload
        },
        removemessage(state, action) {
            const messageId = action.payload
            const filteredState = state.messages.filter(data => data._id !== messageId)
            state.messages = filteredState
        }
    }
})

export const { addmessage, allmessages, removemessage } = messagesSlice.actions
export default messagesSlice.reducer