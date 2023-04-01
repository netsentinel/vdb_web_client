import { Hash } from "crypto";
import React, { useState } from "react";
import cls from "./AuthForm.module.css";
import envHelper from '../../../helpers/envHelper';
import { authHelper } from '../../../helpers/authHelper';
import RegistrationRequest from "src/models/Auth/RegistrationRequest";
import IUserInfoFromJwt from '../../../models/Auth/IUserInfoFromJwt';

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitEnabled, setSubmitEnabled] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const onSubmit = async () => {
        setSubmitEnabled(false);
        setTimeout(() => setSubmitEnabled(true), 5000);
        setErrorMessage("");
        console.info(`Submitting: ${email}:${password}`);

        let result: IUserInfoFromJwt | undefined;
        try {
            result = await authHelper.performRegistrationAsync(new RegistrationRequest(email, password), true);
        } catch { }

        console.info(`Received object from server:`);
        console.info(result);

        if (!result) {
            if (authHelper.lastStatus) {
                let status = authHelper.lastStatus;

                if (status === 400)
                    setErrorMessage("Problem on client side. Please reload window.");
                else if (status === 401)
                    setErrorMessage("Wrong password.");
                else if (status === 404)
                    setErrorMessage("Server was unable to find existing account and refused to create new one.");
                else if (status === 409)
                    setErrorMessage("Server has found existing account but refused to authorize it.");
                else if (status >= 500)
                    setErrorMessage("Problem on server side. Please try later.");
                else {
                    setErrorMessage("Unable to send data to server.")
                }

                setErrorMessage(errorMessage + ` Error code: HTTP_${status}.`);
            }
            else {
                setErrorMessage("Unable to send data to server.")
            }
        }

        setSubmitEnabled(true);
    }


    return (
        <span className={cls.AuthWrapper}>
            <div className={[cls.AuthWrapperHeader, cls.AuthText].join(' ')}>login or register</div>
            <br />
            <input
                type={"email"}
                value={email} onChange={(e) => setEmail(e.target.value)}
                className={[cls.AuthWrapperElement, cls.AuthInput, cls.AuthText].join(' ')} />
            <br />
            <input
                type={"password"}
                value={password} onChange={(e) => setPassword(e.target.value)}
                className={[cls.AuthWrapperElement, cls.AuthInput, cls.AuthText].join(' ')} />
            <br />
            <button
                type="submit"
                onClick={onSubmit}
                className={[cls.AuthWrapperElement, cls.AuthButton, cls.AuthText].join(' ')} disabled={!submitEnabled}>submit</button>
            <br />
            {errorMessage
                ? <div
                    className={[cls.AuthWrapperElement, cls.AuthText, cls.AuthErrorBox].join(' ')}
                >{errorMessage}</div>
                : <span />
            }
        </span>
    );
}

export default AuthForm;