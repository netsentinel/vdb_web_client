import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Route, Routes } from "react-router-dom";
import classes from "./Main.module.css";

const Main = () => {
    return (
        <div role={"main"} className={classes.appMain}>
            <Routes>
                <Route path="download" element={ <span>download</span>} />
            </Routes>
        </div>
    );
}

export default Main;