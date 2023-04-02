import React from "react";
import './LinkButton.css'
import { Link } from "react-router-dom";

function LinkButton(props) {
    const {path, selector, text} = props

    return (
        <Link to={path} className={`btn ${selector}`}>{text}</Link>
    )
}

export default LinkButton