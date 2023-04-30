import { useState, useEffect } from "react";
import cl from "./DevicesList.module.css";
import EnvHelper from "src/helpers/EnvHelper";
import IUserDevice from '../../models/Device/IUserDevice';
import UserApiHelper from '../../helpers/UserApiHelper';
import DeviceCard from '../DeviceCard/DeviceCard';
import { CSSTransition } from 'react-transition-group';

const DevicesList: React.FC = () => {
    const [devices, setDevices] = useState<IUserDevice[]>();
    if (!devices) new UserApiHelper()
        .getUserDevices().then(
            d => {
                setDevices(d)
                if (!devices && EnvHelper.isDebugMode()) { // add some entities for testing
                    setDevices([
                        {
                            Id: 1, UserId: 1, LastConnectedNodeId: 1, LastSeenUtc: "111",
                            WireguardPublicKey: "Kq0LygX5ESfSpIDQO0k4dGSCnOAIZlJDPFacBeOBMCE="
                        },
                        {
                            Id: 2, UserId: 1, LastConnectedNodeId: 1, LastSeenUtc: "111",
                            WireguardPublicKey: "HwHqB2DgFzxqkyxyF3vN4bA3DXD1lBKrYvm4Dr4oiBU="
                        },
                        {
                            Id: 3, UserId: 1, LastConnectedNodeId: 1, LastSeenUtc: "111",
                            WireguardPublicKey: "Ugm+Dvja3Pvf9qNag4Muy+xsQjELnenTadpj6CmTuWQ="
                        },
                    ])
                }
            }
        );

    const [transState, setTransState] = useState(false);
    useEffect(() => {
        setTransState(true);
    }, []);

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
            <span className={[cl.deviceListWrapper].join(' ')}>
                {(devices && devices.length > 0)
                    ? devices.map(x => <DeviceCard {...x} key={x.Id} />)
                    : <span className={[cl.WarningText].join(' ')}>
                        You have no devices.
                    </span>}
            </span>
        </CSSTransition>);
}

export default DevicesList;