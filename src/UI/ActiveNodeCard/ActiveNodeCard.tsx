import cl from "./ActiveNodeCard.module.css";
import { NavLink } from "react-router-dom";
import GlobalContext from '../../helpers/GlobalContext';
import hrefs from "../../config/hrefsList.json";
import { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import ApiHelper from '../../helpers/ApiHelper';
import { IPublicNodeInfo } from "src/models/Connection/PublicNodeInfo";

const ActiveNodeCard: React.FC<IPublicNodeInfo> = (props) => {
    const [transState, setTransState] = useState(false);
    useEffect(() => {
        setTransState(true);
    }, []);


    function capitalize(s:string) {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    return (
        <span className={cl.cardWrapper}>
            <span className={props.isActive ? cl.cardActive : cl.cardInactive}>
                <strong>{capitalize(props.name)}</strong>&nbsp;&nbsp;Connections: {props.clientsConnected}
            </span>
        </span>
    );
}

export default ActiveNodeCard;