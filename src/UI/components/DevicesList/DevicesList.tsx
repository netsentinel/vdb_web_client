import { useState } from "react";
import cl from "./DevicesList.module.css";
import IUserDevice from '../../../models/Device/IUserDevice';
import UserApiHelper from '../../../helpers/apiHelper';
import DeviceCard from "../DeviceCard/DeviceCard";


const DevicesList: React.FC = () => {
    const [devices, setDevices] = useState<IUserDevice[]>();

    if (!devices) new UserApiHelper()
        .getUserDevices().then(d => setDevices(d));

    return (<span className={[cl.AreaWrapper].join(' ')}>
        {(devices && devices.length > 0)
            ? devices.map(x => <DeviceCard {...x} />)
            : <span className={[cl.WarningText].join(' ')}>
                You have no devices.
            </span>}
    </span>);
}

export default DevicesList;