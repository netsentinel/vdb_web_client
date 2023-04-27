import React from 'react';
import Footer from './UI/parts/footer/Footer';
import Header from './UI/parts/header/Header';
import Main from './UI/parts/main/Main';
import Modal from 'react-modal';
import "./App.css"
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import EnvHelper from './helpers/EnvHelper';
import { env } from 'process';
import GlobalContext from './helpers/GlobalContext';
import AuthHelper from './helpers/AuthHelper';


function App() {
  //#region Post-load
  const setLogLevel = () => {
    var level = EnvHelper.logLevel();

    if (level === EnvHelper.logLevels.at(-1)) { // enable all

    }
    if (level === EnvHelper.logLevels.at(-2)) { // disable log
      console.log = function () { }
    }
    if (level === EnvHelper.logLevels.at(-3)) { // disable +info
      console.log = console.trace = console.info = function () { };
    }
    if (level === EnvHelper.logLevels.at(-4)) { // disable +warn
      console.log = console.trace = console.info = console.warn = function () { };
    }
    if (level === EnvHelper.logLevels.at(-5)) { // disable +error
      console.log = console.trace = console.info = console.warn = console.error = function () { };
    }
  }
  //#endregion


  AuthHelper.EnsureUserInContext();
  Modal.setAppElement('#root');
  setLogLevel();
  axios.defaults.withCredentials = true;

  return (
    <span className="App">
      <BrowserRouter>
        <Header />
        <Main />
        <Footer />
      </BrowserRouter>
    </span>
  );
}

export default App;
