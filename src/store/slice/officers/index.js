import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    officers: []
}

export const officersSlice = createSlice({
    name: 'officers',
    initialState,
    reducers: {
        allofficers(state, action) {
            state.officers = action.payload
        },
        addofficer(state, action) {
            state.officers = [...state.officers, action.payload]
        },
        removeofficer(state, action) {
            const userId = action.payload
            const filteredState = state.officers.filter(data => data._id !== userId)
            state.officers = filteredState
        }
    }
})



export const { allofficers, addofficer, removeofficer } = officersSlice.actions
export default officersSlice.reducer