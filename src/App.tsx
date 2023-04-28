import axios from 'axios';
import VdbHeader from './UI/VdbHeader/VdbHeader';
import cl from "./App.module.css";
import { BrowserRouter } from 'react-router-dom';
import VdbMain from './UI/VdbMain/VdbMain';

function App() {
  axios.defaults.timeout = 5000;

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
