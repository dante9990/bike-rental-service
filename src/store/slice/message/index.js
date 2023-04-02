import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: {}
}

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        getmessage(state, action) {
            state.message = action.payload
        },
        editmessage(state, action) {
            state.message = action.payload
        }
    }
})

export const { getmessage, editmessage } = messageSlice.actions
export default messageSlice.reducer