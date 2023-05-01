import axios from 'axios';
import VdbHeader from './UI/VdbHeader/VdbHeader';
import cl from "./App.module.css";
import { BrowserRouter } from 'react-router-dom';
import VdbMain from './UI/VdbMain/VdbMain';
import AuthHelper from './helpers/AuthHelper';
import EnvHelper from './helpers/EnvHelper';

function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.timeout = 5000;
  AuthHelper.EnsureUserInContext();

  console.info(`Is debug mode: ${EnvHelper.isDebugMode()}`)

  return (
    <span className={cl.wrapper}>
      <span className={cl.app}>
        <BrowserRouter>
          <VdbHeader />
          <VdbMain />
        </BrowserRouter>
      </span>
    </span>
  );
}

export default App;
