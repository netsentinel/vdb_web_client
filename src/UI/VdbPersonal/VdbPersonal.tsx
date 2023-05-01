import cl from "./VdbPersonal.module.css";
import { NavLink, useNavigate } from 'react-router-dom';
import GlobalContext from '../../helpers/GlobalContext';
import hrefs from "../../config/hrefsList.json";
import { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import DevicesList from "../DevicesList/DevicesList";
import AuthHelper from '../../helpers/AuthHelper';

const VdbPersonal: React.FC = () => {
    const navigate = useNavigate();
    const [transState, setTransState] = useState(false);
    useEffect(() => {
        setTimeout(() => setTransState(true), 0);
    }, []);

    const logout = () =>{
        GlobalContext.logout();
        navigate("/");
        window.location.reload();
    }

    const transitionClasses = {
        enterActive: cl.welcomeTransitionEnter,
        enterDone: cl.welcomeTransitionEnterActive,
        exitActive: cl.welcomeTransitionExit,
        exitDone: cl.welcomeTransitionExitActive,
    }
    const commonTransProp = {
        timeout: 300,
        classNames: transitionClasses
    }

    return (
        <CSSTransition in={transState} {...commonTransProp}>
            <span className={cl.personalWrapper}>
                <span className={cl.loggedAs}>
                    You are logged in as: <span className={cl.loggedAsEmail}>
                        {GlobalContext.currentUser?.Email ?? "unknown"}
                    </span>
                    <button className={cl.logoutBtn}  onClick={logout}>
                        LOG OUT
                    </button>
                </span>     
                <span className={cl.personalText}>
                    Devices:
                </span>
                <DevicesList />
            </span>
        </CSSTransition>
    );
}

export default VdbPersonal;