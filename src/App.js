import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar/navbar';
import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Homepage from './components/home-page/home-page.js';
import Products from './components/products/products.js';
import Categories from './components/categories/categories.js';
import EditProduct from './components/products/edit.js';
import DeleteProduct from './components/products/delete.js';
import LoginPage from './components/login-page/login-page';

function App() {
  
  const [token, setToken] = useState();

  if(!token) {
    return <LoginPage setToken={setToken} />
  }

  return (
    <BrowserRouter>
      <div >
        <Navbar />
        <Switch>
              {/* <Route path="/" exact component={() => <LoginPage />} /> */}
              <Route path="/" exact component={() => <Homepage />} />
              <Route path="/Products" component={() => <Products />} />
              <Route path="/EditProducts" component={() => <EditProduct />} />
              <Route path="/DeleteProducts" component={() => <DeleteProduct />} />
              <Route path="/Categories" component={() => <Categories />} />
        </Switch>  
      </div>
    </BrowserRouter>

  );
}

export default App;
