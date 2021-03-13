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
import Orders from './components/orders/orders.js';
import NotFound from './components/not-found/not-found';
import AddCategory from './components/categories/add';
import DeleteCategory from './components/categories/delete';
import EditCategory from './components/categories/edit';
import NullCategoryId from './components/products/null-categoryID';

export default function App() {
  
  const [token, setToken] = useState();

  if(!token) {
    return <LoginPage setToken={setToken} />
  } 

  return (
    <Router history={createBrowserHistory()}>
      <div >
        <Navbar />
        <Switch>
              <Route path="/" exact component={() => <Homepage />} />

              {/* Products */}
              <Route path="/Products" component={() => <Products />} />
              <Route path="/NullProducts" component={() => <NullCategoryId />} />
              <Route path="/EditProducts" component={(props) => <EditProduct token={token} {...props}/>} />
              <Route path="/DeleteProducts" component={(props) => <DeleteProduct token={token} {...props}/>} />
              <Route path="/AddProducts" component={(props) => <AddProduct token={token} {...props}/>} />

              {/* Categories */}
              <Route path="/Categories" component={() => <Categories />} />
              <Route path="/EditCategory" component={(props) => <EditCategory token={token} {...props}/>} />
              <Route path="/DeleteCategory" component={(props) => <DeleteCategory token={token} {...props}/>} />
              <Route path="/AddCategory" component={(props) => <AddCategory token={token} {...props}/>} />

              {/* Users */}
              <Route path="/Users" component={() => <UsersMain token={token}/>} />
              <Route path="/SignUp" component={() => <SignUp token={token}/>} />
              <Route path="/EditUser" component={(props) => <EditUser token={token} {...props}/>} />
              <Route path="/DeleteUser" component={(props) => <DeleteUser token={token} {...props}/>} />
              <Route path="/Orders" component={(props) => <Orders token={token} {...props}/>} />
              <Route path="/NotFound" component={() => <NotFound />} />
        </Switch>  
      </div>
    </Router>

  );
}

