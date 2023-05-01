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

        if (
            password.length < authSettings.passwordMinLength ||
            password.length > authSettings.passwordMaxLength ||
            (authSettings.passwordMustContainDigits && !(/\d/.test(password))) || // has digit
            (authSettings.passwordMustContainUpperCase && password.toLowerCase() === password) ||
            (authSettings.passwordMustContainLowerCase && password.toUpperCase() === password)
        ) {
            console.info("Password failed client-side validation.");
            let error =
                `Password must be ${authSettings.passwordMinLength} ` +
                `to ${authSettings.passwordMaxLength} characters long.`;

            if (!(authSettings.passwordMustContainDigits ||
                authSettings.passwordMustContainUpperCase ||
                authSettings.passwordMustContainLowerCase)) {
                setErrorMessage(error);
                return;
            }

            error += ` It must contain at least`;

            if (authSettings.passwordMustContainDigits) {
                error += ` one digit`;
            }
            if (authSettings.passwordMustContainLowerCase) {
                if (!error.endsWith('least'))
                    if (authSettings.passwordMustContainUpperCase)
                        error += ',';
                    else
                        error += ' and'

                error += ` one lower case letter`;
            }
            if (authSettings.passwordMustContainUpperCase) {
                if (!error.endsWith('least')) error += ' and';

                error += ` one upper case letter`;
            }

            error += '.';
            setErrorMessage(error);
            setSubmitEnabled(true);
            return;
        }



        if (!EnvHelper.isDebugMode()) {
            setSubmitEnabled(false);
            if (!EnvHelper.isDebugMode()) setTimeout(() => setSubmitEnabled(true), 5000);
        }
        setErrorMessage("");
        console.info(`Submitting: ${email}:${password}`);


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
                <span className={cl.authHeader}>
                    <strong>Sign in</strong>&nbsp;or&nbsp;<strong>Sign up</strong>
                </span>
                <span className={cl.credentialsLabel}>Email</span>
                <input
                    type={"email"}
                    placeholder="Email"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    className={cl.credentialsInput} />
                <span className={cl.credentialsLabel}>Password</span>
                <input
                    type={"password"}
                    placeholder="Password"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    className={cl.credentialsInput} />
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