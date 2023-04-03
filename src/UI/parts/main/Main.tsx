import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Route, Routes } from "react-router-dom";
import classes from "./Main.module.css";
import AuthForm from '../../components/AuthForm/AuthForm';
import SupportInfo from "src/UI/parts/SupportInfo/SupportInfo";
import PersonalArea from '../PersonalArea/PersonalArea';
import MainArea from "src/UI/components/MainArea/MainArea";

const Main = () => {
    return (
        <div role={"main"} className={classes.appMain}>
            <Routes>
                <Route path="" element={<MainArea/>} />
                <Route path="download" element={<span>download</span>} />
                <Route path="support" element={<SupportInfo />} />
                <Route path="auth" element={<AuthForm />} />
                <Route path="personal" element={<PersonalArea/>} />
            </Routes>
        </div>
    );
}

export default Main;