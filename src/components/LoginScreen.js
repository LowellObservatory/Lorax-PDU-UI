import React, { useState } from "react";
import configData from "../config.json";
import PDUNavbar from "./PDUNavbar";

function LoginScreen(props) {
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (pass === configData.password) {
            props.onFormSwitch("go");
        }
        console.log(pass);
    }

    return (
        <div className="login-div">
        <PDUNavbar />
        <form className="loginscreen" onSubmit={handleSubmit}>
            <h1>Login</h1>
            <label htmlFor="password">password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password"
                placeholder = "********" id="password" name="password" />
        </form>
        </div>
    );
};

export default LoginScreen;