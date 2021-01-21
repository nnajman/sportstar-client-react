import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";

export default function EditProduct() {
   
    const [productDetails, setProductDetails] = useState(null);

    useEffect(() => {
        const index = window.location.toString().lastIndexOf('/')+1;
        const id = window.location.toString().substring(index);

        fetch('http://localhost:8080/Products/'+id)
        .then((response) => response.json())
        .then((data) => setProductDetails(data.product));
    }, []);

    if (productDetails === null)
        return "";

    return (
        
        <div className="container rounded bg-white mt-5 center width-auto">
         <div className="row justify-content-center blue-background ">
            <div className="col-md-4 border-right">
                <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                    <h3 className="font-weight-bold">{productDetails.name}</h3>
                    <img className="rounded-circle mt-5" src={"http://localhost:8080/" + productDetails.image} width={160} alt=""/>
                </div>
            </div>
            <div className="col-md-8">
                <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex flex-row align-items-center back"><i className="fa fa-long-arrow-left mr-1 mb-1" />
                    <h6 className="bold"><Link to ={'/Products'}>Back to products</Link></h6>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-6"><input type="text" className="form-control" placeholder="Name" defaultValue={productDetails.name} /></div>
                    <div className="col-md-6"><input type="text" className="form-control" defaultValue={productDetails.gender} placeholder="Gender" /></div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-6"><input type="text" className="form-control" placeholder="Brand" defaultValue={productDetails.brand} /></div>
                    <div className="col-md-6"><input type="text" className="form-control" defaultValue={productDetails.price} placeholder="Price" /></div>
                </div>
                <div className="mt-5 text-right"><button className="btn btn-primary profile-button" type="button">Save Profile</button></div>
                </div>
            </div>
            </div>
      </div>
    )
}
