import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function EditProduct() {
   
    const [productDetails, setProductDetails] = useState(null);
    const [productName, setProductName] = useState(null);
    const [productBrand, setProductBrand] = useState(null);
    const [productPrice, setProductPrice] = useState(null);
    const history = useHistory();

    useEffect(() => {
        const index = window.location.toString().lastIndexOf('/')+1;
        const id = window.location.toString().substring(index);

        fetch('http://localhost:8080/Products/'+id)
        .then((response) => response.json())
        .then((data) => { setProductDetails(data.product); 
                          setProductName(data.product.name);
                          setProductBrand(data.product.brand);
                          setProductPrice(data.product.price); });
    }, []);

    if (productDetails === null)
        return "";

    const editProduct = () => {
        var EditedProduct = {
            'name': productName,
            'brand': productBrand,
            'price': productPrice
        };

        let index = window.location.toString().lastIndexOf('/')+1;
        let id = window.location.toString().substring(index);

        var formBody = [];
        for (var property in EditedProduct) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(EditedProduct[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch('http://localhost:8080/Products/'+id, {headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                                                     method:'PATCH', body: formBody})
        .then(() => history.push("/Products"));
    }

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
                    <div className="col-md-6">
                        <input type="text" className="form-control" placeholder="Name" defaultValue={productDetails.name} 
                               onChange={ (e) => setProductName( e.target.value ) }/>
                    </div>
                    <div className="col-md-6">
                        <input type="text" className="form-control" defaultValue={productDetails.gender} placeholder="Gender" />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-6">
                        <input type="text" className="form-control" placeholder="Brand" defaultValue={productDetails.brand} 
                               onChange={ (e) => setProductBrand( e.target.value ) }/>
                    </div>
                    <div className="col-md-6">
                        <input type="text" className="form-control" defaultValue={productDetails.price} placeholder="Price ₪" 
                               onChange={ (e) => setProductPrice( e.target.value ) }/>
                        </div>
                </div>

                <div className="mt-5 text-right"><button className="btn btn-primary profile-button" type="button"
                     onClick={editProduct}>Save Changes</button></div>
                </div>
            </div>
            </div>
      </div>
    )
}
