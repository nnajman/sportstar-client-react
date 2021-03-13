import { Link } from "react-router-dom";
// import socketIOClient from 'socket.io-client';
import './navbar.css';
function Navbar() {
  // const ENDPOINT = 'http://localhost:8080';
  // const socket = socketIOClient(ENDPOINT);
  // socket.on('counter', counter => {
  //   debugger;
  // });
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
          <li className="nav-item active">
            <Link to="/Orders" className="nav-link white-link" aria-current="page">Orders</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;