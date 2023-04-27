import { useState } from "react";
import IUserDevice from '../../../models/Device/IUserDevice';
import UserApiHelper from '../../../helpers/UserApiHelper';
import DevicesList from "src/UI/components/DevicesList/DevicesList";
import GlobalContext from "src/helpers/GlobalContext";
import cl from "./PersonalArea.module.css"
import { useNavigate } from "react-router-dom";

const PersonalArea = () => {
    const navigate = useNavigate();
    const logout = ()=>{
        GlobalContext.logout();
        navigate("/");
    }

    return (
        <span className={[cl.AreaWrapper].join(' ')}>
            <button
                className={[cl.RedButton].join(' ')}
                onClick={logout}>
                Sign out
            </button>
            <DevicesList />
        </span>
    );
}

export default PersonalArea;