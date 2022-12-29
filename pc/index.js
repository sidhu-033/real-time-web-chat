import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
// import Reduce from "./redux/Main"
import store from "./addtocart/store"
// import store1 from "./redux cart/store"
// import Main from "./redux cart/Main"
import {Provider} from "react-redux"
import Calculator from './Calculator';
import Travel from "./addtocart/travel"
// import Set from "./Settimeout"
// import Cart from "./redux cart/Cart"
// import Check from "./check"
// import Fetch from "./Fetch"
// import Useref from "./Useref"
// import Page1 from "./New folder/Page1"
// import App from "./Add cart/App"
// import A from "./child/A"
import Signup from "./pc/signup"
import Signin from "./pc/signin"
import Home from "./pc/home"
import Route from "./pc/routes"

// import Todo from "./Todo"
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

     <Provider store={store}>
      <BrowserRouter>
        {/* <Route/> */}
        <Travel/>
        {/* <Calculator/> */}
        </BrowserRouter>
    </Provider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
