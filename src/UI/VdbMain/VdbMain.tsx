import cl from "./VdbMain.module.css";
import { NavLink } from "react-router-dom";
import GlobalContext from '../../helpers/GlobalContext';
import { CSSTransition } from 'react-transition-group';
import { Route, Routes } from "react-router-dom";
import VdbWelcome from '../VdbWelcome/VdbWelcome';
import AuthForm from "../AuthForm/AuthForm";
import VdbDownload from '../VdbDownload/VdbDownload';
import VdbPersonal from '../VdbPersonal/VdbPersonal';

const VdbMain: React.FC = () => {

    return (
        <Routes>
            <Route path="/" element={<VdbWelcome />} />

            <Route path="/download" element={<VdbDownload/>}/>

            <Route path="/auth" element={<AuthForm/>}/>
            <Route path="/personal" element={<VdbPersonal/>}/>
        </Routes>
    );
}

export default VdbMain;