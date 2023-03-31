import React from "react";
import cls from "./Header.module.css";
import { authHelper } from "src/helpers/authHelper";
import { NavLink } from "react-router-dom";

const Header = () => {
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
                    <NavLink to="/auth" className={[cls.appHeaderPart, cls.appHeaderText].join(' ')}>
                        sign up/in
                    </NavLink>
                    <NavLink to="/support" className={[cls.appHeaderPart, cls.appHeaderText].join(' ')}>
                        support us
                    </NavLink>
                </span>
            </nav>
        </header>
    );
}

export default Header;