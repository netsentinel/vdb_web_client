import React, { useEffect, useMemo, useState } from "react";
import cls from "./Header.module.css";
import { NavLink } from "react-router-dom";
import GlobalContext from '../../../helpers/GlobalContext';

const Header: React.FC = () => {
    const [accountPath, setAccountPath] = useState("auth");
    const [accountPathName, setAccountPathName] = useState("account");
    const [currentUserEmail, setCurrentUserEmail] = useState<string>();

    // TODO: this memo not working
    const userMemo = useMemo(() => {
        console.info("Memo[globalContext.currentUser] triggered.\n"
            + `Global user is: ${GlobalContext.currentUser?.Email}`);
        setAccountPath(GlobalContext.currentUser ? "/personal" : "/auth")
        setAccountPathName(GlobalContext.currentUser?.Email.split('@')[0] ?? "sign in")
    }, [currentUserEmail]);

    const reviewUser = () => {
        console.log("Reviewing user...");
        if(GlobalContext.currentUser?.Email !== currentUserEmail){
            setCurrentUserEmail(GlobalContext.currentUser?.Email);
        }
    }
    setInterval(reviewUser, 1000);

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