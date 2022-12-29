import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
const signin = () =>{
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate();
  const showpassword=()=>{
    var pass=document.getElementById("password1");
    if(pass.type=="password"){
      pass.type="text";
    } else {
      pass.type="password";
    }

  }
  const show=(e)=>{
    e.preventDefault();
    var m=document.getElementById("error1");
    validateEmail(email);
    fetch("http://localhost:5000/login",{
      method:"POST",
      headers:{
        'Content-type':'application/json',
      },
      body:JSON.stringify({email:email,password:password})

    }).then((data)=>data.json())
    .then((res)=>{
      console.log(res)
      localStorage.setItem("token",res.data.token)
      localStorage.setItem("name",res.data.name)
      navigate('/welcome')
    })


  }
  const validateEmail = (inputText) => {
    var m = document.getElementById("error1")
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputText.match(mailformat)) {

      return true;
    }
    else {
      m.innerHTML += "<li>You have entered an invalid email address!</li>"

      return false;
    }
  }
  return (
    <>
    <div className='row justify-content-center  py-5 bg-dark'>
        <div className='col-lg-5 col-md-7 col-sm-12  rounded bg-light p-4 pt-0'>
          {/* <form className="text-center py-5 " action="../../post" method="post" > */}
          <form className="text-center p-5 " onSubmit={show}  >

            <h2 className='fw-bolder mb-3'>DaebaKK</h2>
            <label className="fw-bold">Email ID </label><br />
            <input type="text" id="email1" name="email" className='text-center w-100 py-2 ' value={email} onChange={(e)=>setEmail(e.target.value)}></input><br /><br />
            <label className="fw-bold">Password </label><br />
            <input type="password" id="password1" name="password" className='text-center w-100 py-2 ' value={password} onChange={(e)=>setPassword(e.target.value)}></input><br /><br />
            <input type="checkbox" className='form-check-input me-2' onClick={showpassword} />Show Password<br /><br /><br />
            <button type="submit" className="btn btn-dark rounded-pill fw-bold w-50 py-3" >Sign In</button>
          </form>
          <div id="error1" className='container text-start text-danger'>

          </div>
        </div>
    </div>
    </>
  )
}
export default signin;