import './categories.css';
import React, { useState, useEffect } from "react"
function Categories() {

    const [categories, setCategories] = useState([]);
    const [gender, setGender] =  useState("men");
     
    useEffect(() => {
      fetch('http://localhost:8080/Categories?gender=' + gender)
      .then((response) => response.json())
      .then((data) => setCategories(data.categories));
  }, [gender]);

    return (
      <div>
        <img className="background" src="https://cdn.shopify.com/s/files/1/0059/0056/6597/products/photo-id-2008220827717-young-man-running-along-the-beach-in-morning_1200x800.jpg?v=1563890102" alt=""/>
        <div className="products-container">
        <div className="center">
          <h1 className="title">Categories</h1>
          <select className="form-select select" aria-label="Default select example"
                    onChange={ (e) => setGender( e.target.value ) }>
              <option value="men">Men</option>
              <option value="women">Women</option>
          </select>
        </div>
          <ul className="list-group list">
          { categories.map((item, key) =>
              <li className="list-group-item d-flex justify-content-between align-items-center">{item.title}
              
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