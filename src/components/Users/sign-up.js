import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MuiAlert from "@material-ui/lab/Alert";
import { Link, useHistory } from "react-router-dom";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

async function signUpUser(credentials, token) {

  return fetch('http://localhost:8080/Users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token.token
    },
    body: JSON.stringify(credentials)
  });
}

export default function SignUpForm(props) {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phone, setPhone] = useState();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleSubmit = async e => {
    if (email === "" || password === "") {
      setError("Fields are required");
      return;
    } else {
      e.preventDefault();
      const message = await signUpUser({
        email,
        password,
        firstName,
        lastName,
        phone
      }, props.token);
      if ((message.status === 500)){ 
        setError("Server inner problem");
      } else if (message.status === 404) {
        history.push("NotFound");
      }else if (message.status !== 200) {
        setError(message.statusText);
      } else if (message.status === 200){
        setSuccess(message.statusText);
        history.push("/Users");
      } else {
        setError("Unknown problem");
      }
    }
  }

  return (
    <div>
      <img className="background" src="https://wallpaperaccess.com/full/2132976.jpg" alt="" />
      <div className="users-container">
        {/* blue-background-login */}

        <div className="center ">
          {/* <h1>Welcome to Sport Star Admin Site</h1> */}
          <form className="form-signin" onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 font-weight-normal">Create User</h1>
            <br />
            <label htmlFor="inputEmail" className="sr-only">Email address</label>
            <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required
              onChange={e => setEmail(e.target.value)} />
            <br />
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input type="password" id="inputPassword" className="form-control" placeholder="Password" required
              onChange={e => setPassword(e.target.value)} />
            <br />
            <label htmlFor="inputFirstName" className="sr-only">First Name</label>
            <input id="inputFirstName" className="form-control" placeholder="First Name" required
              onChange={e => setFirstName(e.target.value)} />
            <br />
            <label htmlFor="inputLastName" className="sr-only">Last Name</label>
            <input id="inputLastName" className="form-control" placeholder="Last Name" required
              onChange={e => setLastName(e.target.value)} />
            <br />
            <label htmlFor="inputPhone" className="sr-only">Phone</label>
            <input id="inputPhone" className="form-control" placeholder="Phone" required
              onChange={e => {
                var reg = /^\d+$/;
                if (reg.test(e.target.value))
                  setPhone(e.target.value)
              }
              } />
            <br />
            <button className="btn btn-lg btn-primary btn-block" type="submit">Create</button>
            <button className="btn btn-lg btn-secondary btn-block"><Link to={'/Users'}>Back to Users</Link></button>

            {success && (
              <Alert severity="success" onClick={() => setSuccess(null)}>
                {success}
              </Alert>
            )}
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

SignUpForm.propTypes = {
  userToken: PropTypes.func.isRequired
}
