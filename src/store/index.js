import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/auth";
import messageSlice from "./slice/message";
import messagesSlice from "./slice/messages";
import officerSlice from "./slice/officer";
import officersSlice from "./slice/officers";


const store = configureStore({
    reducer: {
        auth: authSlice,
        officers: officersSlice,
        officer: officerSlice,
        messages: messagesSlice,
        message: messageSlice
    }
})

export default store