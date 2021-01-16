import { Link } from "react-router-dom";
import './navbar.css';
function Navbar() {
    return (
      <nav className="navbar navbar-expand navbar-dark bg-dark" aria-label="Second navbar example">
        <div className="container-fluid">
          <a href="/" className="navbar-brand white-link">Sport Star Management</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample02" aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarsExample02">
          {/* <a href="/" className="nav-link white-link" aria-current="page">Home</a> */}
          <a href="/Products" className="nav-link white-link" aria-current="page">Products</a>
          <a href="/Categories" className="nav-link white-link" aria-current="page">Categories</a>
            {/* <ul className="navbar-nav me-auto">
            <li className="nav-item active">
                <a href="/" className="nav-link white-link" aria-current="page">Home</a>
              </li>
              <li className="nav-item active">
                <a href="/Products" className="nav-link white-link" aria-current="page">Products</a>
              </li>
              <li className="nav-item active">
                <a href="/Categories" className="nav-link white-link" aria-current="page">Categories</a>
              </li>
            </ul> */}
            {/* <form>
              <input className="form-control" type="text" placeholder="Search" aria-label="Search" />
            </form> */}
          </div>
        </div>
      </nav>
      );
}

export default Navbar;