import { useState } from "react";
import cl from "./DeviceCard.module.css";
import IUserDevice from '../../../models/Device/IUserDevice';
import UserApiHelper from '../../../helpers/apiHelper';
import DevicesList from "src/UI/components/DevicesList/DevicesList";

const PersonalArea = () => {
    return (
        <span style={{width:"100%"}}>
           <DevicesList/>
        </span>
    );
}

export default PersonalArea;