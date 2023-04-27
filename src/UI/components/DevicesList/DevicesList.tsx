import { useState } from "react";
import cl from "./DevicesList.module.css";
import IUserDevice from '../../../models/Device/IUserDevice';
import UserApiHelper from '../../../helpers/UserApiHelper';
import DeviceCard from "../DeviceCard/DeviceCard";
import EnvHelper from "src/helpers/EnvHelper";


const DevicesList: React.FC = () => {
    const [devices, setDevices] = useState<IUserDevice[]>();

    if (!devices) new UserApiHelper()
        .getUserDevices().then(
            d => {
                setDevices(d)
                if (!devices && EnvHelper.isDebugMode()) {
                    setDevices([
                        { Id: 1, UserId: 1, LastConnectedNodeId: 1, LastSeenUtc: "123", WireguardPublicKey: "Kq0LygX5ESfSpIDQO0k4dGSCnOAIZlJDPFacBeOBMCE=" },
                        { Id: 2, UserId: 1, LastConnectedNodeId: 1, LastSeenUtc: "123", WireguardPublicKey: "HwHqB2DgFzxqkyxyF3vN4bA3DXD1lBKrYvm4Dr4oiBU=" },
                        { Id: 3, UserId: 1, LastConnectedNodeId: 1, LastSeenUtc: "123", WireguardPublicKey: "Ugm+Dvja3Pvf9qNag4Muy+xsQjELnenTadpj6CmTuWQ=" },
                    ])
                }
            }
        );

    return (<span className={[cl.AreaWrapper].join(' ')}>
        {(devices && devices.length > 0)
            ? devices.map(x => <DeviceCard {...x} key={x.WireguardPublicKey}/>)
            : <span className={[cl.WarningText].join(' ')}>
                You have no devices.
            </span>}
    </span>);
}

export default DevicesList;