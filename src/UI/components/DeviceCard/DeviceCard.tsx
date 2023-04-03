import { useState } from "react";
import cl from "./DeviceCard.module.css";
import IUserDevice from '../../../models/Device/IUserDevice';


const DeviceCard: React.FC<IUserDevice> = (props) => {
    const [isMainDisabled, setMainDisabled] = useState(true);

    const id = props.Id;
    const pk = props.WireguardPublicKey;
    const lastNode = props.LastConnectedNodeId;
    const lastSeen = props.LastSeenUtc;
    const pkDisplayed = pk.substring(0,3) + "..." + pk.substring(pk.length-1-3);

    return (<span className={[cl.CardWrapper].join(' ')} aria-disabled={isMainDisabled}>
        <span>#{id} {pkDisplayed}</span>
        <span>Last connection: {lastSeen}</span>
        <button className={[cl.RemoveButton].join(' ')}>
            Disconnect and remove
        </button>
    </span>);
}

export default DeviceCard;