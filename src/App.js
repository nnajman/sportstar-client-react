import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar/navbar';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Homepage from './components/home-page/home-page.js';
import Products from './components/products/products.js';
import Categories from './components/categories/categories.js';
function App() {
  return (
    <BrowserRouter>
      <div >
        <Navbar />
        {/* <Homepage /> */}
        <Switch>
              <Route path="/" exact component={() => <Homepage />} />
              <Route path="/Products" component={() => <Products />} />
              <Route path="/Categories" component={() => <Categories />} />
        </Switch>  
      </div>
    </BrowserRouter>

  );
}

export default App;
