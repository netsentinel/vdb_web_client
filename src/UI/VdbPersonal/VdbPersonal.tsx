import cl from "./VdbPersonal.module.css";
import { NavLink, useNavigate } from 'react-router-dom';
import GlobalContext from '../../helpers/GlobalContext';
import hrefs from "../../config/hrefsList.json";
import { useState, useEffect, useMemo } from 'react';
import { CSSTransition } from 'react-transition-group';
import DevicesList from "../DevicesList/DevicesList";
import AuthHelper from '../../helpers/AuthHelper';
import UserApiHelper from '../../helpers/UserApiHelper';
import ISessionsResponse from '../../models/Auth/ISessionsResponse';
import VdbSecurity from '../VdbSecurity/VdbSecurity';
import EnvHelper from '../../helpers/EnvHelper';
import IUserInfoFromJwt from '../../models/Auth/IUserInfoFromJwt';
import ApiHelper from '../../helpers/ApiHelper';

const VdbPersonal: React.FC = () => {
    const navigate = useNavigate();
    if (GlobalContext.currentUser == undefined &&
        (!EnvHelper.isDebugMode() || EnvHelper.isProduction())) {
        navigate("/auth");
    }

    const [deviceLimits, setDeviceLimit] = useState(0);
    useMemo(() => {
        console.info("Using memo in personal block...");
        var helper = new UserApiHelper();
        const GetAccessLevel = (user: IUserInfoFromJwt) => {
            if (user.IsAdmin === true) return 3;
            if (Date.parse(user.PayedUntilUtc) > Date.now()) return 2;
            if (user.IsEmailConfirmed === true) return 1;

            return 0;
        }
        ApiHelper.getDevicesLimits().then(r => {
            console.log(`Loaded user access level is \'${GetAccessLevel(GlobalContext.currentUser!)}\'.`);
            var limit = r?.filter(x => x.accessLevel == GetAccessLevel(GlobalContext.currentUser!))[0].devicesLimit;
            if (limit !== undefined) setDeviceLimit(limit);
        });
    }, []);

    const [transState, setTransState] = useState(false);
    useEffect(() => {
        setTimeout(() => setTransState(true), 0);
    }, []);

    const logout = async () => {
        await new UserApiHelper().terminateThisSession();
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
                    <button className={cl.logoutBtn} onClick={logout}>
                        LOG OUT
                    </button>
                </span>
                <span className={cl.loggedAs}>Devices limit: <span style={{fontWeight:"500"}}>{deviceLimits}</span></span>

                <span className={cl.personalText}>
                    Security:
                </span>
                <VdbSecurity />
                <span className={cl.personalText}>
                    Devices:
                </span>
                <DevicesList />
            </span>
        </CSSTransition>
    );
}

export default VdbPersonal;