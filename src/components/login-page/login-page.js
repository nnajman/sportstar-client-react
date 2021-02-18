import './login-page.css';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

async function loginUser(credentials) {

  return fetch('http://localhost:8080/Users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  }).then(data => data.json())
 }

export default function LoginPage({ setToken }) {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState("");

    const handleSubmit = async e => {
      if (email === "" || password === "") {
        setError("Fields are required");
        return;
      } else {
        e.preventDefault();
        const token = await loginUser({
          email,
          password
        });
        if (token.message !== "Auth successful") {
          setError("Authentication failed");
        } else {
          setToken(token);
        }
      }
    }

    return (
      <div>
        <img className="background" src="https://www.desktopbackground.org/download/o/2010/12/13/125480_page-2-full-hd-1080p-sport-wallpapers-desktop-backgrounds-hd_1920x1080_h.jpg" alt=""/>
        <div className="login-container">
        {/* blue-background-login */}
       
        <div className="center "> 
        <h1>Welcome to Sport Star Admin Site</h1>
          <form className="form-signin" onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 font-weight-normal">Please sign in to enter</h1>
            <br/>
            <label htmlFor="inputEmail" className="sr-only">Email address</label>
            <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required 
                   onChange={e => setEmail(e.target.value)}/>
            <br/>
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input type="password" id="inputPassword" className="form-control" placeholder="Password" required 
                   onChange={e => setPassword(e.target.value)}/>
            <br/>
            <div className="checkbox mb-3">
              <label>
                <input type="checkbox" defaultValue="remember-me" /> Remember me
              </label>
            </div>
            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            <p className="mt-5 mb-3 text-muted">© Sport Star </p>

            {error && (
              <Alert severity="error" onClick={() => setError(null)}>
                {error}
              </Alert>
            )}

          </form>
        </div>
        </div>
      </div>
    )
}

LoginPage.propTypes = {
  setToken: PropTypes.func.isRequired
}
