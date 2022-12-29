import React, { useEffect, useState } from "react";
import io from 'socket.io-client';
import "./style.css";

const Welcome = () =>{
  const [tok,setTok]=useState(localStorage.getItem("token"));
  const [name,setName]=useState(localStorage.getItem("name"));
  const [data,setData]=useState({});
  const [msag,setMessage]=useState(localStorage.getItem("msg"));
  
  let socket = io.connect('http://localhost:5000');

  useEffect(()=>{
    const fetchData = async () => {
      const response = await fetch(`http://localhost:5000/getdata/${tok}`);
      const newData = await response.json();
      console.log(newData);
      setData(newData);



    };
  
    
    fetchData();
    socket.on('message', (msg) => {
      // setMessage(msg.message)
      if((msg.user!==name)){
        // console.log(msg.message+ " "+ msag)
      appendMessage(msg, 'incoming')
      scrollToBottom()

      }
      
    })
    function scrollToBottom() {
    let messageArea = document.querySelector('.message__area')
    
    messageArea.scrollTop = messageArea.scrollHeight
    }

  },[msag])
  

  

  
  // let send=document.getElementById('send');
  function appendMessage(msg, type) {
    let messageArea = document.querySelector('.message__area')

    let mainDiv = document.createElement('div')
    let className = type;
    // let flag=0
    if(type=="incoming"){
      localStorage.setItem("msg",msg.message)
      setMessage(msg.message)
      // if(msg.message==msag){
      //   flag=1;
      // }
    }
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup;
    console.log("msg.user:"+msg.user+" type:"+ type +" name:"+name);
    // console.log("name"+name);
    // if(flag==0){
    messageArea.appendChild(mainDiv)
    // }
    
}
// socket.on('message', (msg) => {
//   appendMessage(msg, 'incoming')
//   scrollToBottom()
// })
function scrollToBottom() {
  let messageArea = document.querySelector('.message__area')

  messageArea.scrollTop = messageArea.scrollHeight
}
  const sendd=()=>{
    let textarea = document.querySelector('#textarea')
  let messageArea = document.querySelector('.message__area')
    // sendMessage(textarea.value)
  // function sendMessage(message) {
    let msg = {
        user: name,
        message: textarea.value.trim()
    }
    // Append 
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // Send to server 
    socket.emit('message', msg)




// function scrollToBottom() {
//     messageArea.scrollTop = messageArea.scrollHeight
// }

  }
  
  return (
    <>
    <div className='row justify-content-center  py-3 bg-dark px-5'>
      <div className="col-lg-3 col-md-2 col-sm-12  rounded bg-light ">
      <div className="subheader pt-3">
              {/* <h5 className="bg-dark text-white rounded-circle d-inline p-2 px-3">{name[0]}</h5> */}
              <h5 className="text-start fw-bold d-inline ms-2">{data.fname} {data.lname}</h5>
            </div>

      </div>
        <div className='col-lg-5 col-md-7 col-sm-12  rounded bg-light  '>
          {/* <form className="text-center py-5 " action="../../post" method="post" > */}
          
            <div className="header mt-3 d-flex justify-content-between">
            <img src="img/letter-d.png" width="50px" height="50px"></img>
            <h1 className='fw-bolder d-inline'>DaebaKK</h1>
            <div className="d-flex justify-content-end">
              <img src="img/voice.png" width="40px" height="40px" className="ms-5"></img>
              <img src="img/video.png" width="40px" height="40px" className="ms-2"></img>
            </div>
            </div>
            
            <div className="message__area">

            </div>
            

            <div className="input-group input-group-lg mb-3">
  <input type="text" className="form-control" id="textarea" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" placeholder="Type here..."/>
  <span className="input-group-text bg-dark text-white" id="send" onClick={sendd}>SEND</span>

</div>
            {/* <h5>token: {tok}</h5> */}
        </div>
    </div>
    </>
  )
}
export default Welcome;