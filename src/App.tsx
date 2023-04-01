import React from 'react';
import Footer from './UI/parts/footer/Footer';
import Header from './UI/parts/header/Header';
import Main from './UI/parts/main/Main';
import Modal from 'react-modal';
import "./App.css"
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import envHelper from './helpers/envHelper';
import { env } from 'process';
import globalContext from './helpers/globalContext';
import { authHelper } from './helpers/authHelper';


function App() {
  //#region Post-load
  const setLogLevel = () => {
    var level = envHelper.logLevel();

    if (level === envHelper.logLevels.at(-1)) { // enable all

    }
    if (level === envHelper.logLevels.at(-2)) { // disable log
      console.log = function () { }
    }
    if (level === envHelper.logLevels.at(-3)) { // disable +info
      console.log = console.trace = console.info = function () { };
    }
    if (level === envHelper.logLevels.at(-4)) { // disable +warn
      console.log = console.trace = console.info = console.warn = function () { };
    }
    if (level === envHelper.logLevels.at(-5)) { // disable +error
      console.log = console.trace = console.info = console.warn = console.error = function () { };
    }
  }
  //#endregion


  authHelper.tryLoadUserAndRefreshIfNeeded();
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
