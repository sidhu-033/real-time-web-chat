import React from 'react';
import {Link} from 'react-router-dom';

const Home = () => {
  return (
    <div className='row justify-content-center  py-5 bg-dark text-center'>
        <div className='col-lg-5 col-md-7 col-sm-12  rounded bg-light p-4 pt-0'>
            <h2 className='fw-bolder mb-3'>DaebaKK</h2>
            <Link to="/signup">signup</Link><br/>
            <Link to="/signin">signin</Link><br/>
            <Link to="/welcome">welcome</Link>
        </div>
    </div>
  )
}

export default Home