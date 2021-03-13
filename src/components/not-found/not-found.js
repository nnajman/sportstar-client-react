import { Link } from "react-router-dom";
import './not-found.css';

export default function NotFound() {

    return (
        <div id="wrapper">
            <img className="backgroundNotFound" src="https://i.imgur.com/qIufhof.png" alt=""/>
            <div id="info" className="not-found-container">
                <h1>404 Not Found</h1>
                <h3>This page could not be found</h3>
                <h6 className="bold"><Link to ={'/'}>Return to Home Page</Link></h6>
            </div>
        </div >
    )
    
}