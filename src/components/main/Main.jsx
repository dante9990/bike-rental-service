import React from "react";
import { Route, Routes } from "react-router-dom";
import FormMessage from "../formMessage/FormMessage";
import Home from "../home/Home";
import MessageInfo from "../messageInfo/MessageInfo";
import Messages from "../messages/messages";
import SignInForm from "../signInForm/SignInForm";
import SignUpForm from "../signUpForm/SignUpForm";
import UserProfile from "../userProfile/UserProfile";
import './Main.css'
import MyProfile from "../myProfile/MyProfile";
import Officers from "../officers/Officers";
import { useAuth } from "../../utils/hook";
import NotAuth from "../notAuth/NotAuth";
import NotFound from "../notFound/NotFound";

function Main(props) {

    const auth = useAuth()

    const { regSubmit, authSubmit, user } = props

    return (
        <main className='main'>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='cases' element={auth ? <Messages /> : <NotAuth />} />
                <Route path="officers" element={auth ? <Officers /> : <NotAuth />} />
                <Route path="auth/sign_up" element={<SignUpForm regSubmit={regSubmit} textBtn="Зарегистрироваться" />} />
                <Route path="auth/sign_in" element={<SignInForm authSubmit={authSubmit} />} />
                <Route path="cases/submit" element={<FormMessage />} />
                <Route path="/officers/:id" element={auth ? <UserProfile /> : <NotAuth />} />
                <Route path="/cases/:id" element={auth ? <MessageInfo /> : <NotAuth />} />
                <Route path="my_profile" element={auth ? <MyProfile user={user} /> : <NotAuth />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </main>
    )
}

export default Main