import './products.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export default function NullCategoryId() {
    
    const [products, setProducts] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {

        fetch('http://localhost:8080/Products?categoryId=blank')
        .then((response) => response.json())
        .then((data) => setProducts(data.products));

        setSearchValue("");

    }, []);

    if (products === null)
        return "";

    const doSearch = (e) => {  

      fetch('http://localhost:8080/Products?name=' + e.target.value + '&categoryId=blank')
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
            <h6 className="bold"><Link to ={'/Products'}>Back to products</Link></h6>
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
                {(() => {
                  if ((item.image).includes("https")) {
                    return (<img src={item.image} className="img-fluid resize" alt=""/>)
                    } else {
                      return (<img src={"http://localhost:8080/" + item.image} className="img-fluid resize" alt=""/>)
                    }
                  })()}
                </div>                
              </li>
            )}
          </ul>
        </div>
      </div>
    )
}
