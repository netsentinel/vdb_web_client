import cl from "./AuthForm.module.css";
import { NavLink, useNavigate } from 'react-router-dom';
import GlobalContext from '../../helpers/GlobalContext';
import { CSSTransition } from 'react-transition-group';
import { Route, Routes } from "react-router-dom";
import VdbWelcome from '../VdbWelcome/VdbWelcome';
import { useState, useEffect } from 'react';
import EnvHelper from '../../helpers/EnvHelper';
import AuthHelper from '../../helpers/AuthHelper';
import authSettings from "../../config/authSettings.json"
import RegistrationRequest from '../../models/Auth/RegistrationRequest';

const AuthForm: React.FC = () => {
    const [transState, setTransState] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitEnabled, setSubmitEnabled] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setTransState(true);
    }, []);

    const onSubmit = async () => {
        if (EnvHelper.isDebugMode())
            setErrorMessage("Test erorr message");

        setSubmitEnabled(false);
        setTimeout(() => setSubmitEnabled(true), 10000);
        setErrorMessage("");
        console.info(`Submitting: ${email}:${password}`);

        if (
            password.length < authSettings.passwordMinLength ||
            password.length > authSettings.passwordMaxLength ||
            !(/\d/.test(password)) || // has digit
            password.toLowerCase() === password ||
            password.toUpperCase() === password
        ) {
            console.info("Password failed client-side validation.");
            setErrorMessage(
                `Password must be ${authSettings.passwordMinLength}` +
                `to ${authSettings.passwordMaxLength} characters long and contain` +
                `at least one digit, one upper case and one lower case letters.`);
        }

        let result = false;
        try {
            result = await AuthHelper.PerformRegistrationAsync(new RegistrationRequest(email, password), true);
        } catch { }

        if (!result) {
            if (AuthHelper.lastStatus) {
                let status = AuthHelper.lastStatus;
                let selectedError: string;

                if (status === 400)
                    selectedError = "Problem on client side. Please reload window.";
                else if (status === 401)
                    selectedError = "Wrong password.";
                else if (status === 404)
                    selectedError = "Server was unable to find existing account and refused to create a new one.";
                else if (status === 409)
                    selectedError = "Server has found existing account but refused to authorize it.";
                else if (status >= 500)
                    selectedError = "Problem on server side. Please try later.";
                else {
                    selectedError = "Unable to send data to server.";
                }

                setErrorMessage(selectedError + ` Error code: HTTP_${status}.`);
            }
            else {
                setErrorMessage("Unable to send data to server.")
            }
        }
        else {
            console.info("Redirecting to personal...");
            navigate("/personal");
            window.location.reload();
        }

        setSubmitEnabled(true);
    }


    const transitionClasses = {
        enterActive: cl.welcomeTransitionEnter,
        enterDone: cl.welcomeTransitionEnterActive,
        exitActive: cl.welcomeTransitionExit,
        exitDone: cl.welcomeTransitionExitActive,
    }
    const commonTransProp = {
        timeout: 200,
        classNames: transitionClasses
    }

    return (
        <CSSTransition in={transState} {...commonTransProp}>
            <span className={cl.authWrapper}>
                <span>Email</span>
                <input
                    type={"email"}
                    placeholder="Email"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    className={cl.credentialsInput} />
                <br />
                <span>Password</span>
                <input
                    type={"password"}
                    placeholder="Password"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    className={cl.credentialsInput} />
                <br />
                <button
                    type="submit"
                    onClick={onSubmit}
                    className={cl.authSubmit}
                    disabled={!submitEnabled}>SUBMIT</button>
                {errorMessage
                    ? <span className={cl.errorWrapper}>
                        <span>{errorMessage}</span>
                    </span>
                    : <span />
                }
            </span>
        </CSSTransition>
    );
}

export default AuthForm;