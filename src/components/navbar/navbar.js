import { Link } from "react-router-dom";
import './navbar.css';
function Navbar() {
    return (
      <nav className="navbar navbar-expand navbar-dark bg-dark" aria-label="Second navbar example">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand white-link">Sport Star Management</Link>
            <ul className="navbar-nav me-auto">
            {/* <li className="nav-item active">
                <Link to="/" className="nav-link white-link" aria-current="page">Home</Link>
              </li> */}
              <li className="nav-item active">
                <Link to="/Products" className="nav-link white-link" aria-current="page">Products</Link>
              </li>
              <li className="nav-item active">
                <Link to="/Categories" className="nav-link white-link" aria-current="page">Categories</Link>
              </li>
              <li className="nav-item active">
                <Link to="/Users" className="nav-link white-link" aria-current="page">Users</Link>
              </li>
            </ul>
        </div>
      </nav>
      );
}

export default Navbar;