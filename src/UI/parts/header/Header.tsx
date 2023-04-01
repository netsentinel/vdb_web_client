import React, { useMemo, useState } from "react";
import cls from "./Header.module.css";
import { authHelper } from "src/helpers/authHelper";
import { NavLink } from "react-router-dom";
import globalContext from '../../../helpers/globalContext';

const Header = () => {
    const [accountPath,setAccountPath] = useState("auth");

    var currUserMemo = useMemo(()=>{
        setAccountPath(globalContext.currentUser? "/personal" : "/auth")
    }, [globalContext.currentUser]);
    
    return (
        <header className={cls.appHeader}>
            <nav className={[cls.appHeaderRow, "verticalCenter"].join(' ')}>
                <span>
                    <NavLink to="/" className={[cls.appHeaderTitle, cls.appHeaderPart, cls.appHeaderText].join(' ')}>
                        vdb
                    </NavLink>
                    <NavLink to="/download" className={[cls.appHeaderPart, cls.appHeaderText].join(' ')}>
                        download
                    </NavLink>
                    <NavLink to="/support" className={[cls.appHeaderPart, cls.appHeaderText].join(' ')}>
                        support us
                    </NavLink>
                    <NavLink to={globalContext.currentUser? "/personal" : "/auth"} className={[cls.appHeaderPart, cls.appHeaderText].join(' ')}>
                        account
                    </NavLink>
                </span>
            </nav>
        </header>
    );
}

export default Header;