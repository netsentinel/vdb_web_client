import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Route, Routes } from "react-router-dom";
import classes from "./Main.module.css";
import AuthForm from '../../components/AuthForm/AuthForm';

const Main = () => {
    return (
        <div role={"main"} className={classes.appMain}>
            <Routes>
                <Route path="" element={ <span>main</span>} />
                <Route path="download" element={ <span>download</span>} />
                <Route path="auth" element={ <span style={{width:"100%"}} className="verticalCenter">
                    <AuthForm />
                </span>} />
                <Route path="support" element={ <span>support</span>} />
            </Routes>
        </div>
    );
}

export default Main;