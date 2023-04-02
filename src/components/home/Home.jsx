import React from "react";
import LinkButton from "../linkButton/LinkButton";
import './home.css'

function Home() {
    return (
            <div className="home">
                <div className="container">
                <p className="home__text">
                    Известная компания, занимающаяся прокатом велосипедов в крупных городах России,
                    испытывает проблемы с частой кражей их имущества (велосипедов).
                    Как возможное решение проблемы, компания хочет вести учёт этих случаев и отслеживать прогресс.
                </p>
                <LinkButton path="cases/submit" selector="btn__message" text="Сообщить о краже" />
                </div>
                <div className="home__img"></div>
            </div>
    )
}

export default Home