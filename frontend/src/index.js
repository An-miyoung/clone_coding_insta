import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {AppProvider} from "store";
import 'index.scss';
import 'antd/dist/antd.css';
import Root from 'pages';

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
        <AppProvider>
          <Root />
        </AppProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


