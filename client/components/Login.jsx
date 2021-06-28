import React from 'react';
import { Link, useHistory  } from 'react-router-dom';
import Header from './Header.jsx'
import KATSlogo from './pictures/KATSlogo.png'

const Login = props => {
  const history = useHistory();

  return (
  <div id='loginpage'>
    <Header />
    <Link to={'/confirmation'}>
      <button
        type="button"
      >
        confirmation page
      </button>
    </Link>
    <Link to={'/shop'}>
      <button 
        type="button"
      >
      Just let me into the Shop
      </button>
    </Link>

    <ul className="nav nav-tabs">
      <li><a href="#a" data-toggle="tab">Log In</a></li>
      <li><a href="#b" data-toggle="tab">Sign Up</a></li>
    </ul>

    <div className="tab-content">
      <div className="tab-pane active" id="a">
        <form method="POST" action='/login'>
          <input className='username' name='username' type='text' placeholder='username'/>
          <input className='pass' name='pass' type='text' placeholder='password'/>
          <input 
          type='submit' 
          value="Log In" 
          ></input>
        </form>
      </div>

      <div className="tab-pane" id="b">
        <form method="POST" action='/signup'>
          <input type='text' name='firstname' placeholder='first name'/>
          <input type='text' name='lastname' placeholder='last name'/>
          <input type='text' name='email' placeholder='email'/>
          <input type='text' name='username' placeholder='username'/>
          <input type='text' name='pass' placeholder='password'/>
          <input 
          type='submit' 
          value="Sign Up" 
          ></input>
        </form>
      </div>
    </div>

    <div>
      <img src={KATSlogo}></img>
      
      {/* {fetch('/')
      .then(
        data => 
      )
      .catch(err => {() => console.log(`Error display home splash image ${err}`)})
      } */}

      {/* I think we can do our routing like this
      <img src={`/uploads/${img.img.path}`} /> */}
    </div>
  </div>
)};

export default Login;