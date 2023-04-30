import { useState } from "react";
import cl from "./DeviceCard.module.css";
import UserApiHelper from "src/helpers/UserApiHelper";
import IUserDevice from '../../models/Device/IUserDevice';
import { getJSDocReturnType } from "typescript";


const DeviceCard: React.FC<IUserDevice> = (props) => {
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const [isMainHidden, setMainHidden] = useState(false);
    const [isButtonHidden, setButtonHidden] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [commonMsg, setCommonMsg] = useState("");

    const id = props.Id;
    const pk = props.WireguardPublicKey;
    const lastNode = props.LastConnectedNodeId;
    const lastSeen = props.LastSeenUtc;
    const pkDisplayed = pk.substring(0, 3) + "..." + pk.substring(pk.length - 1 - 3);

    const onDelete = async () => {
        console.log("Disabling remove button...");
        setButtonDisabled(true);

        let deleted = await new UserApiHelper().removeUserDevice(pk)

        if (deleted) {
            console.info("Device was deleted.");
            setCommonMsg("Removed successfully.");
            setButtonHidden(true);
            return;
        } else {
            console.info("Unable to remove device.");
            setErrorMsg("Unable to remove device.");
        }


        console.log("Enabling remove button...");
        setInterval(() => setButtonDisabled(false), 5000);
    }

    if (isMainHidden) {
        return (<span />);
    }

    return (
        <span className={[cl.cardWrapper].join(' ')}>
            <span className={cl.col}>
                <span className={cl.pkSpan}>
                    <strong>Key:</strong> {pk}
                </span>
                <span>
                    <strong>Last seen:</strong> {lastSeen}
                </span>
                <span>
                    <strong>Last node:</strong> {lastNode}
                </span>
            </span>
            <span className={cl.removeWrapper}>
                <button className={cl.removeButton} onClick={onDelete} disabled={isButtonDisabled}>
                    DISCONNECT AND REMOVE
                </button>
                {errorMsg
                    ? <span className={cl.errorMsg}>{errorMsg}</span>
                    : <span />}
                {commonMsg
                    ? <span className={cl.commonMsg}>{commonMsg}</span>
                    : <span />}
            </span>
        </span>);
}

export default DeviceCard;