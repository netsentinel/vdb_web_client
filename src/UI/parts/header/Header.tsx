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
                        bruhcontent.ru
                    </NavLink>
                    <NavLink to="/news" className={[cls.appHeaderPart, cls.appHeaderText].join(' ')}>
                        news
                    </NavLink>
                    <NavLink to="/blog" className={[cls.appHeaderPart, cls.appHeaderText].join(' ')}>
                        blog
                    </NavLink>
                    <NavLink to="/services" className={[cls.appHeaderPart, cls.appHeaderText].join(' ')}>
                        services
                    </NavLink>
                </span>
            </nav>
        </header>
    );
}

export default Header;