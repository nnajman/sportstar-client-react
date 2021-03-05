import './products.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { useRef } from 'react';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

function Products() {
    
    const [categories, setCategories] = useState([]);
    const [gender, setGender] =  useState("men");
    // Jeans
    const [categoryID, setCategoryID] =  useState("5ff9bae397e7c91a801e44c4");
    const [products, setProducts] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    const lastGender = useRef("men");
    // Jeans
    const lastCategory = useRef("5ff9bae397e7c91a801e44c4");

    useEffect(() => {
      
        fetch('http://localhost:8080/Categories?gender=' + gender)
        .then((response) => response.json())
        .then((data) => setCategories(data.categories));

        if (gender !== lastGender.current) {
          if (gender === "women") {
            // Dresses
            setCategoryID("5ff9bab397e7c91a801e44c1");
            lastGender.current = "women";          
          };
  
          if (gender === "men") {
            // Jeans
            setCategoryID("5ff9bae397e7c91a801e44c4");
            lastGender.current = "men";  
          };
        } 

        fetch('http://localhost:8080/Products?categoryId=' + categoryID)
        .then((response) => response.json())
        .then((data) => setProducts(data.products));

        if (gender !== lastGender.current || categoryID !== lastCategory.current) {
          setSearchValue("");
          lastCategory.current = categoryID;
        }       

    }, [gender, categoryID]);

    if (categories === null)
        return "";

    if (products === null)
    return "";

    const doSearch = (e) => {  

      fetch('http://localhost:8080/Products?name=' + e.target.value + '&categoryId=' + categoryID)
      .then((response) => response.json())
      .then((data) => setProducts(data.products));
      setSearchValue(e.target.value);
  }

    return (
      <div>
        <img className="background" src="https://d39l2hkdp2esp1.cloudfront.net/img/photo/124764/124764_00_2x.jpg" alt=""/>
        <div className="products-container">
          <div className="center">
            <h1 className="title">Products</h1>
            <div className="select-padding">
            <select className="form-select select" aria-label="Default select example"
                    onChange={ (e) => setGender( e.target.value ) }>
              <option value="men">Men</option>
              <option value="women">Women</option>
            </select>
            </div>
            <div className="select-padding">
            <select className="form-select select" aria-label="Default select example"
                    onChange={ (o) => setCategoryID( o.target.value ) } value={categoryID}>
            { categories.map((item, key) =>
              <option value={item._id} key={key}>
                {item.title}
              </option>
              )}
            </select>
            </div>
            <div className="select-padding">
              <button className="addUnderTitle"><Link to={{pathname: '/AddProducts', state: {categoryID: categoryID}}}><AddIcon/>Add Product</Link></button>
            </div>
            <input id="productsSearchBar" placeholder="Search specific product by Name" className="select" 
                   value={searchValue} onChange={doSearch} />
          </div>

          <ul className="list-group list .overflow-auto">
          { products.map((item, key) =>
              <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                <p>{item.name}</p>
                <p>{"Price: " + item.price + " ₪"}</p>
                  <IconButton><Link to ={{pathname: '/EditProducts', state: {
                        product: {
                            id: item._id
                        }
                    }}}><EditIcon/></Link></IconButton>
                  <IconButton><Link to={{pathname: '/DeleteProducts', state: {
                        product: {
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

export default Products;