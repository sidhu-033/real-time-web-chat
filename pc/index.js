import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';


import Route from "./pc/routes"

import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

      <BrowserRouter>
        <Route/> 
      </BrowserRouter>

  </React.StrictMode>
);


reportWebVitals();
