import './products.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";

function Products() {

    const [categories, setCategories] = useState([]);
    const [gender, setGender] =  useState("men");
    // Jeans
    const [categoryID, setCategoryID] =  useState("5ff9bae397e7c91a801e44c4");
    const [products, setProducts] = useState([]);

    useEffect(() => {
      
        fetch('http://localhost:8080/Categories?gender=' + gender)
        .then((response) => response.json())
        .then((data) => setCategories(data.categories));

        if (gender !== window.$lastGender) {
          if (gender === "women") {
            // Dresses
            setCategoryID("5ff9bab397e7c91a801e44c1");
            // window.$categoryID = "5ff9bab397e7c91a801e44c1";
            window.$lastGender = "women";
            // fetch('http://localhost:8080/Products?categoryId=' + window.$categoryID)
            // .then((response) => response.json())
            // .then((data) => setProducts(data.products));
          };
  
          if (gender === "men") {
            // Jeans
            setCategoryID("5ff9bae397e7c91a801e44c4");
            // window.$categoryID = "5ff9bae397e7c91a801e44c4";
            window.$lastGender = "men";
            // fetch('http://localhost:8080/Products?categoryId=' + window.$categoryID)
            // .then((response) => response.json())
            // .then((data) => setProducts(data.products));
          };
        } else {
 
        }
        fetch('http://localhost:8080/Products?categoryId=' + categoryID)
        .then((response) => response.json())
        .then((data) => setProducts(data.products));

    }, [gender, categoryID]);

    if (categories === null)
        return "";

    if (products === null)
    return "";

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

            <select className="form-select select" aria-label="Default select example"
                    onChange={ (o) => setCategoryID( o.target.value ) } value={categoryID}>
            { categories.map((item, key) =>
              <option value={item._id} key={key}>
                {item.title}
              </option>
              )}
            </select>
          </div>

          <ul className="list-group list .overflow-auto">
          { products.map((item, key) =>
              <li key={key} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                <p>{"Name: " + item.name}</p>
                <p>{"Price: " + item.price + " ₪"}</p>
                  <button className="btn" type="button"><Link to ={'/EditProducts/' + item._id}>Edit</Link></button>
                  <button className="btn btn-left red-btn" type="button"><Link to={'/DeleteProducts/' + item._id}>Delete</Link></button>
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