import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    officer: {}
}

export const officerSlice = createSlice({
    name: 'officer',
    initialState,
    reducers: {
        getofficer(state, action) {
            state.officer = action.payload
        },
        editofficer(state, action) {
            state.officer = action.payload
        }
    }

})



export const { getofficer, editofficer } = officerSlice.actions
export default officerSlice.reducer