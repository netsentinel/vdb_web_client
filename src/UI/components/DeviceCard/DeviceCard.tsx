import { useState } from "react";
import cl from "./DeviceCard.module.css";
import IUserDevice from '../../../models/Device/IUserDevice';
import UserApiHelper from "src/helpers/UserApiHelper";


const DeviceCard: React.FC<IUserDevice> = (props) => {
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const [isMainHidden, setMainHidden] = useState(false);

    const id = props.Id;
    const pk = props.WireguardPublicKey;
    const lastNode = props.LastConnectedNodeId;
    const lastSeen = props.LastSeenUtc;
    const pkDisplayed = pk.substring(0, 3) + "..." + pk.substring(pk.length - 1 - 3);

    const onDelete = () => {
        setButtonDisabled(true);
        setTimeout(() => setButtonDisabled(false), 5000);
        new UserApiHelper().removeUserDevice(pk).then(deleted => {
            if (deleted) {
                console.info("Device was deleted.");
                setMainHidden(true);
            } else {
                console.info("Unable to delete device.");
            }
        });
    }

    return !isMainHidden
            ? <span className={[cl.CardWrapper].join(' ')}>
                <span className={[cl.CardElement].join(' ')}>#{id} {pkDisplayed}</span>
                <span className={[cl.CardElement].join(' ')}>Last connection: {lastSeen}</span>
                <button className={[cl.RemoveButton].join(' ')} onClick={onDelete} disabled={isButtonDisabled}>
                    Disconnect and remove
                </button>
            </span> 
            : <span />;
}

export default DeviceCard;