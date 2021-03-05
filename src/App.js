import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar/navbar';
import {createBrowserHistory} from 'history'
import React, { useState } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Homepage from './components/home-page/home-page.js';
import Products from './components/products/products.js';
import Categories from './components/categories/categories.js';
import EditProduct from './components/products/edit.js';
import DeleteProduct from './components/products/delete.js';
import LoginPage from './components/login-page/login-page.js';
import AddProduct from './components/products/add.js';
import UsersMain from './components/Users/users-main';
import SignUp from './components/Users/sign-up.js';
import EditUser from './components/Users/edit.js';
import DeleteUser from './components/Users/delete.js';

// import io from "socket.io-client";
// const socket = io.connect("http://localhost:8080");

function App() {
  
  const [token, setToken] = useState();

  if(!token) {
    return <LoginPage setToken={setToken} />
  } 

  return (
    <Router history={createBrowserHistory()}>
      <div >
        <Navbar />
        <Switch>
              {/* <Route path="/" exact component={() => <LoginPage />} /> */}
              <Route path="/" exact component={() => <Homepage />} />
              <Route path="/Products" component={() => <Products />} />
              <Route path="/EditProducts" component={(props) => <EditProduct token={token} {...props}/>} />
              <Route path="/DeleteProducts" component={(props) => <DeleteProduct token={token} {...props}/>} />
              <Route path="/AddProducts" component={(props) => <AddProduct token={token} {...props}/>} />
              <Route path="/Categories" component={() => <Categories />} />
              <Route path="/Users" component={() => <UsersMain token={token}/>} />
              <Route path="/SignUp" component={() => <SignUp token={token}/>} />
              <Route path="/EditUser" component={(props) => <EditUser token={token} {...props}/>} />
              <Route path="/DeleteUser" component={(props) => <DeleteUser token={token} {...props}/>} />
        </Switch>  
      </div>
    </Router>

  );
}

export default App;
