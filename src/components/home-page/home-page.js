import './home-page.css';
import { Link } from "react-router-dom";

function Homepage() {
    return (
     <div>
        <img className="background" src="https://upl.stack.com/wp-content/uploads/2014/03/24130205/stack-getfaster.jpg" />
        <div className="shop-container">
          <h1 className="title">Welcome Manager</h1>
          <div className="shop-buttons">
            <button style={{marginRight: '3%'}} className="shop-button"><a className="black-link" aria-current="page"><Link to="/Products">Products</Link></a></button>
            <button className="shop-button"><a className="black-link" aria-current="page"><Link to="/Categories">Categories</Link></a></button>
          </div>
        </div>
      </div>
    )
}

export default Homepage;