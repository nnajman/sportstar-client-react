import './categories.css';
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

function Categories() {

    const [categories, setCategories] = useState([]);
    const [gender, setGender] =  useState("men");
    const [searchValue, setSearchValue] = useState("");

     
    useEffect(() => {
      fetch('http://localhost:8080/Categories?gender=' + gender)
      .then((response) => response.json())
      .then((data) => setCategories(data.categories));
  }, [gender]);

  const doSearch = (e) => {  

    fetch('http://localhost:8080/Categories?gender=' + gender + '&title=' + e.target.value)
    .then((response) => response.json())
    .then((data) => setCategories(data.categories));
    setSearchValue(e.target.value);
}
    return (
      <div>
        <img className="background" src="https://cdn.shopify.com/s/files/1/0059/0056/6597/products/photo-id-2008220827717-young-man-running-along-the-beach-in-morning_1200x800.jpg?v=1563890102" alt=""/>
        <div className="products-container">
        <div className="center">
        <h1 className="title">Categories</h1>
        <div className="select-padding">
            <select className="form-select select" aria-label="Default select example"
                      onChange={ (e) => setGender( e.target.value ) }>
                <option value="men">Men</option>
                <option value="women">Women</option>
            </select>
          </div>
          <div className="select-padding">
          <button className="addUnderTitle"><Link to ={{pathname: '/AddCategory', state: {gender: gender}}}><AddIcon/>Add Category</Link></button>
          </div>
          <input id="productsSearchBar" placeholder="Search specific category" className="select" 
                   value={searchValue} onChange={doSearch} />
        </div>
          <ul className="list-group list">
          { categories.map((item, key) =>
              <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                <p>{item.title}</p>
                  <IconButton><Link to ={{pathname: '/EditCategory', state: {
                        category: {
                            id: item._id
                        }
                    }}}><EditIcon/></Link></IconButton>
                  <IconButton><Link to={{pathname: '/DeleteCategory', state: {
                        category: {
                            id: item._id
                        }
                    }}}><DeleteIcon/></Link></IconButton>
                </div>
                <div className="image-parent">
                  <img src={"http://localhost:8080/" + item.image} className="img-fluid resize" alt=""/>
                </div>                
              </li>
            )}
          </ul>
        </div>
      </div>
    )
}

export default Categories;