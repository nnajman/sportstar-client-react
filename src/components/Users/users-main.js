import './users.css';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';

function UsersMain(props) {

    const [users, setUsers] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const token = props.token.token;

    useEffect(() => {
        if (token) {
            fetch('http://localhost:8080/Users', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            },)
            .then((response) => response.json())
            .then((data) => setUsers(data.users));
         }
    }, [token]);
    
    const doSearch = (e) => {  
        if (props.token.token) {
            var searchVal = e.target.value;
            if (searchVal) {
                fetch('http://localhost:8080/Users?email='+searchVal+'&firstName='+searchVal+'&lastName='+searchVal+'&phone='+searchVal+'&inclusive=false', {
                    headers: {
                        'Authorization': 'Bearer ' + props.token.token
                    }
                }).then((response) => response.json())
                    .then((data) => setUsers(data.users));
                    setSearchValue(searchVal);
            } else {
                fetch('http://localhost:8080/Users', {
                    headers: {
                        'Authorization': 'Bearer ' + props.token.token
                    }
                }).then((response) => response.json())
                    .then((data) => setUsers(data.users));
                    setSearchValue(searchVal);
            }

        }
    };

    if (users === null || users === undefined)
    return "";
    

    return (
        <div>
            <img className="background" src="https://wallpaperaccess.com/full/2132976.jpg" alt=""/>
            <div className="users-container">
                <div className="center">
                <h1 className="title">Users</h1>
                <div className="select-padding">
                </div>
                <div className="select-padding">
                    <button className="addUnderTitle"><Link to ='/SignUp'><AddIcon/>Add User</Link></button>
                </div>
                <input id="productsSearchBar" placeholder="Search User by name, email or phone" className="select" 
                        value={searchValue} onChange={doSearch} />
                </div>

                <ul className="list-group list .overflow-auto">
                { users.map((item, key) =>
                <li key={key} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                    <h3>{item.firstName + " " + item.lastName}</h3>
                    <p>{"Email: " + item.email}</p>
                    <p>{"Phone: " + item.phone}</p>
                    <IconButton><Link to ={{pathname: '/EditUser', state: {
                        user: {
                            id: item._id
                        }
                    }}}><EditIcon/></Link></IconButton>
                    <IconButton><Link to ={{pathname: '/DeleteUser', state: {
                        user: {
                            id: item._id
                        }
                    }}}><DeleteIcon/></Link></IconButton>
                    </div>               
                </li>
                )}
                </ul>
            </div>
        </div>
    )
}

export default UsersMain;