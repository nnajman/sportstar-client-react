import React, { useEffect, useState } from 'react';
import MuiAlert from "@material-ui/lab/Alert";
import { Link, useHistory } from "react-router-dom";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function EditUserForm(props) {

    const [email, setEmail] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [phone, setPhone] = useState();
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const history = useHistory();
    const userID = props.location.state.user.id;
    const token = props.token.token;

    useEffect(() => {
        if (token && userID) {
            fetch('http://localhost:8080/Users/' + userID, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            },)
            .then((response) => response.json())
            .then((data) => {
                setEmail(data.user.email);
                setFirstName(data.user.firstName);
                setLastName(data.user.lastName);
                setPhone(data.user.phone);
            })
            .catch(error => {
              if (error.status === 404)
                history.push("NotFound");
            });
        }
    }, [userID, token]);

    const handleSubmit = async e => {
      if (email === "" || firstName === "" || lastName === "" || phone === "") {
        setError("All fields required");
        return;
      } else {
        e.preventDefault();
        const message = await editUser({
          email,
          firstName,
          lastName,
          phone
        }, props.location.state.user.id, props.token);
        if (message.status === 404) {
          history.push("/NotFound");
        } else if (message.status !== 200) {
          setError("Authentication failed");
        } else {
          setSuccess("Admin User Updated");
          history.push("/Users");
        }
      }
    }

    async function editUser(credentials, id, token) {
    
      return fetch('http://localhost:8080/Users/' + id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token.token
        }, body: JSON.stringify(credentials)
      });
    
    }

    return (
      <div>
        <img className="background" src="https://wallpaperaccess.com/full/2132976.jpg" alt=""/>
        <div className="users-container">
        {/* blue-background-login */}
       
        <div className="center "> 
        {/* <h1>Welcome to Sport Star Admin Site</h1> */}
          <form className="form-signin" onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 font-weight-normal">Edit User</h1>
            <br/>
            <label htmlFor="inputEmail" className="sr-only">Email address</label>
            <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required 
                   value={email} onChange={e => setEmail(e.target.value)}/>
            <br/>
            <label htmlFor="inputFirstName" className="sr-only">First Name</label>
            <input id="inputFirstName" className="form-control" placeholder="First Name" required 
                   value={firstName} onChange={e => setFirstName(e.target.value)}/>
            <br/>
            <label htmlFor="inputLastName" className="sr-only">Last Name</label>
            <input id="inputLastName" className="form-control" placeholder="Last Name" required 
                   value={lastName} onChange={e => setLastName(e.target.value)}/>
            <br/>
            <label htmlFor="inputPhone" className="sr-only">Phone</label>
            <input id="inputPhone" className="form-control" placeholder="Phone" required 
                   value={phone} onChange={e => setPhone(e.target.value)}/>
            <br/>
            <button className="btn btn-lg btn-primary btn-block" type="submit">Edit</button>
            <button className="btn btn-lg btn-secondary btn-block"><Link to ={'/Users'}>Back to Users</Link></button>

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
