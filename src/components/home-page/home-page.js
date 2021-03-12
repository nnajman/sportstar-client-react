import './home-page.css';
import { Link } from "react-router-dom";
import ClientsNumber from '../clients-number/clients-number';

function Homepage() {
    return (
     <div>
        <img className="background" src="https://upl.stack.com/wp-content/uploads/2014/03/24130205/stack-getfaster.jpg" alt=""/>
        <div className="shop-container">
          <h1 className="title">Hello Manager</h1>
          <div className="shop-buttons">
            <button style={{marginRight: '3%'}} className="shop-button"><Link to="/Products">Products</Link></button>
            <button style={{marginRight: '3%'}} className="shop-button"><Link to="/Categories">Categories</Link></button>
            <button className="shop-button"><Link to="/Users">Users</Link></button>
          </div>
        </div>
        <ClientsNumber />
      </div>
      
    )
}

export default Homepage;