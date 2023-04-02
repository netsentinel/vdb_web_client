import React, { useMemo, useState } from "react";
import cls from "./Header.module.css";
import { authHelper } from "src/helpers/authHelper";
import { NavLink } from "react-router-dom";
import globalContext from '../../../helpers/globalContext';

const Header = () => {
    const [accountPath, setAccountPath] = useState("auth");
    const [accountPathName, setAccountPathName] = useState("account");

    // TODO: this memo not working
    var currUserMemo = useMemo(() => {
        console.info("Memo[globalContext.currentUser] triggered.\n"
            + `Global user is: ${globalContext.currentUser?.Email}`);
        setAccountPath(globalContext.currentUser ? "/personal" : "/auth")
        setAccountPathName(globalContext.currentUser?.Email.split('@')[0] ?? "sign in")
    }, [globalContext.currentUser]);



    return (
        <header className={cls.appHeader}>
            <nav className={[cls.appHeaderRow, "verticalCenter"].join(' ')}>
                <NavLink to="/" className={[cls.appHeaderTitle, cls.appHeaderPart, cls.appHeaderText].join(' ')}>
                    vdb
                </NavLink>
                <NavLink to="/download" className={[cls.appHeaderPart, cls.appHeaderText].join(' ')}>
                    download
                </NavLink>
                <NavLink to="/support" className={[cls.appHeaderPart, cls.appHeaderText].join(' ')}>
                    support us
                </NavLink>
                <NavLink to={accountPath} className={[cls.appHeaderPart, cls.appHeaderText].join(' ')}>
                    {accountPathName}
                </NavLink>
            </nav>
        </header>
    );
}

export default Header;