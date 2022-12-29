
import React from 'react';
import Signin from './signin';
import Welcome from './welcome'
import { Route, Routes, Link} from 'react-router-dom';


class Signup extends React.Component {
  constructor() {
    super();
    this.state = { name: "", lastname: "", contact: "", email: "", password: "" };

  }
  

  handle = (e) => {

    let nam = e.target.name;
    let val = e.target.value;
    this.setState({ [nam]: val })
  }
  
  show = async(e) => {
    e.preventDefault();
  
    var m = document.getElementById("error")

    m.innerHTML = "<ul>"
    if (this.state.name.search(/[ 0-9]/) >= 0)
      m.innerHTML += "<li>not valid first name</li>"
    if (this.state.lastname.search(/[ 0-9]/) >= 0)
      m.innerHTML += "<li>not valid last name</li>"

    if (this.state.contact.toString().length !== 10)
      m.innerHTML += "<li>contact should be exactly 10 digits long</li>"
    this.ValidateEmail(this.state.email)


    if (this.state.password.search(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/) < 0)
      m.innerHTML += "<li>password should contain atleast one special character</li>"
    if (this.state.password.search(/[ 0-9]/) < 0)
      m.innerHTML += "<li>password should contain atleast 1 number</li>"
    if (!this.checkUppercase(this.state.password)) {
      m.innerHTML += "<li>password should contain atleast one uppercase character</li>"
    }
    if (!this.checkLowercase(this.state.password)) {
      m.innerHTML += "<li>password should contain atleast one lowerrcase character</li>"
    }



  if(m.innerHTML=="<ul></ul>"){
    // e.currentTarget.submit();
    fetch("http://localhost:5000/register",{
      method:"POST",
      headers: {
        'Content-type':'application/json'
      },
      body:JSON.stringify(this.state)
    }).then((data)=>data.json())
    .then((data)=>{
      if(typeof(data)=="string"){
        m.innerHTML += "<li>This email already exists.</li>"
        }else{
          m.innerHTML += "<li>User registered successfully</li>"
          this.setState({ name: "", lastname: "", contact: "", email: "", password: "" })
        }
      // console.log(typeof(data))
    })
    
  }

  
  
}

  checkUppercase = (str) => {
    for (var i = 0; i < str.length; i++) {
      if (str.charAt(i) == str.charAt(i).toUpperCase() && str.charAt(i).match(/[a-z]/i)) {
        return true;
      }
    }
    return false;
  }
  checkLowercase = (str) => {
    for (var i = 0; i < str.length; i++) {
      if (str.charAt(i) == str.charAt(i).toLowerCase() && str.charAt(i).match(/[a-z]/i)) {
        return true;
      }
    }
    return false;
  };
  ValidateEmail = (inputText) => {
    var m = document.getElementById("error")
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputText.match(mailformat)) {

      return true;
    }
    else {
      m.innerHTML += "<li>You have entered an invalid email address!</li>"

      return false;
    }
  }
  showPassword = () => {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
   
//../../post
  render() {
    return (
      <div>
        
      <div className='row justify-content-center  py-5 bg-dark'>
        <div className='col-lg-5 col-md-7 col-sm-12  rounded bg-light p-4 pt-0'>
         
          <form className="text-center p-5 "   >

            <h2 className='fw-bolder mb-3'>DaebaKK</h2>
            <label className="fw-bold">First Name </label><br />
            <input type="text" id="name" name="name" className='text-center w-100 py-2 ' value={this.state.name} onChange={this.handle} ></input><br /><br />
            <label className="fw-bold">Last Name </label><br />
            <input type="text" id="lname" name="lastname" className='text-center w-100 py-2 ' value={this.state.lastname} onChange={this.handle} ></input><br /><br />


            <label className="fw-bold">Contact Number </label><br />
            <input type="text" id="id" name="contact" className='text-center w-100 py-2 ' value={this.state.contact} onChange={this.handle}></input><br /><br />
            <label className="fw-bold">Email ID </label><br />
            <input type="text" id="email" name="email" className='text-center w-100 py-2 ' value={this.state.email} onChange={this.handle}></input><br /><br />
            <label className="fw-bold">Password </label><br />
            <input type="password" id="password" name="password" className='text-center w-100 py-2 ' value={this.state.password} onChange={this.handle} ></input><br /><br />
            <input type="checkbox" className='form-check-input me-2' onClick={this.showPassword} />Show Password<br /><br /><br />
            <button type="submit" className="btn btn-dark rounded-pill fw-bold w-50 py-3" onClick={this.show}>Sign Up</button>

          </form>
          <div id="error" className='container text-start text-danger'>

          </div>
          <Link to="/signin">signin</Link><br/>
         
          

         
        
        </div>
        
      </div>
    
      </div>
    )
  }
}



export default Signup;


