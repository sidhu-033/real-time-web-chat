import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Signup from "./signup";
import Signin from "./signin";
import Welcome from "./welcome";
import Home from "./home";

const routes = () => {
  return (
    <Router>
      {/* <Home/> */}
      <Routes>
            <Route exact path="/" element={<Home/>}></Route>
            <Route path="/signup" element={<Signup/>}></Route>
            <Route path="/signin" element={<Signin/>}></Route>
            <Route path="/welcome" element={<Welcome/>}></Route>
      </Routes>
    </Router>
  )
}

export default routes