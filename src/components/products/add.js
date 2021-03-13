import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AddProduct(props) {

    const [productName, setProductName] = useState(null);
    const [productBrand, setProductBrand] = useState(null);
    const [productPrice, setProductPrice] = useState(null);
    const [productImage, setProductImage] = useState(null);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [stock, setStock] = useState([{
        size: '',
        quantity: ''
    }]);
    const history = useHistory();

    const newProduct = () => {
    
        if (productName === null || productName === "") {
            setError("product name is required");
            return;
        } else if(productBrand === null || productBrand === ""){
            setError("product brand is required");
            return;
        } else if(productPrice === null || productPrice === ""){
            setError("product price is required");
            return;
        } else if(productImage === null){
            setError("product image is required");
            return;
        }

        var NewProduct = {
            'name': productName,
            'brand': productBrand,
            'price': productPrice,
            'image': productImage,
            'categoryId': props.location.state.categoryID,
            'stock': stock
        };

        var formData = new FormData();
        const fileField = document.querySelector('input[type="file"]').files[0];

        for (var property in NewProduct) {
            if (property === 'image') {
                if (fileField) {
                    formData.append(property, fileField);
                }
            } else if (property === 'stock') {
                formData.append(property, JSON.stringify(NewProduct[property]));
            } else {
                formData.append(property, NewProduct[property]);
            }
        }

        const message = fetch('http://localhost:8080/Products',
            {
                headers: { 'Authorization': 'Bearer ' + props.token.token },
                method: 'POST',
                body: formData
            }).then((response) =>  {
                if ((response.status === 500)){ 
                    setError("Server inner problem");
                    } else if (response.status === 404) {
                    history.push("NotFound");
                    }else if (response.status !== 200) {
                    setError(response.message);
                    } else if (response.status === 200){
                    history.push("/Categories");
                    } else {
                    setError("Unknown problem");
                    }
             });
        
    }

    const handleArrayChange = (event, index) => {
        var stockTemp = [...stock];
        stockTemp[index][event.target.name] = event.target.value;
        setStock( stockTemp);
    }

    const addActivity = (e) => {
        // if (state.length < 3) {
        var stockTemp = [...stock, {
            size: '',
            quantity: '',
        }]

        setStock(stockTemp)
    }
    //   }
    const removeElement = (e, index) => {
        if (stock.length > 1) {
            var stockTemp = [...stock]
            stockTemp.splice(index, 1)
            setStock(stockTemp)
        }
    }

    return (

        <div className="container rounded bg-white mt-5 center width-auto">
            <div className="row justify-content-center blue-background ">
                <form className="col-md-8">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between  mb-3">
                            <div className="d-flex flex-row align-items-center back"><i className="fa fa-long-arrow-left mr-1 mb-1" />
                                <h6 className="bold"><Link to={'/Products'}>Back to products</Link></h6>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="form-group col-md-6">
                                <label htmlFor="Name">Name</label>
                                <input type="Name" className="form-control" placeholder="Name" required
                                    onChange={(e) => setProductName(e.target.value)} />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="Brand">Brand</label>
                                <input type="Brand" className="form-control" placeholder="Brand" required
                                    onChange={(e) => setProductBrand(e.target.value)} />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="form-group col-md-6">
                                <label htmlFor="Price">Price</label>
                                <input type="number" className="form-control" placeholder="Price ₪" required
                                    onChange={(e) => {
                                        var reg = /^\d+$/;
                                        if (reg.test(e.target.value) || e.target.value.includes('.')) {
                                            setProductPrice(Number(e.target.value));
                                        }
                                    }} />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="file">Image</label>
                                <input type='file' className="form-control" required
                                    onChange={(e) => setProductImage(e)} />
                            </div>
                        </div>


                        <ul className="list-group .overflow-auto">
                            {stock.map((obj, index) => {
                                return (
                                    <li key={index} className="nostyle  d-flex justify-content-between align-items-center" >
                                        <div className="row mt-3">
                                            <div className="form-group col-md-5">
                                                <label htmlFor="size">Size</label>
                                                <input type="text" className="form-control" name="size" value={obj.size} onChange={(e) => handleArrayChange(e, index)} />
                                            </div>
                                            <div className="form-group col-md-5">
                                                <label htmlFor="quantity">Quantity</label>
                                                <input type="number" className="form-control" name="quantity" value={obj.quantity} onChange={(e) => handleArrayChange(e, index)} />
                                            </div>
                                            <div className="">
                                                <IconButton type={"button"} onClick={(e) => removeElement(e, index)} ><DeleteIcon /></IconButton>
                                            </div>
                                        </div>

                                    </li>
                                )
                            })}
                        </ul>

                        <button type={"button"} onClick={addActivity}>Add More Size</button>

                        <div className="mt-5 text-right"><button className="btn btn-primary profile-button" type="button"
                            onClick={newProduct}>Create</button></div>
                    </div>
                    {success && (
              <Alert severity="success" onClick={() => setSuccess(null)}>
                {success}
              </Alert>
            )}
            {error && (
              <Alert severity="error" onClick={() => setError(null)}>
                {error}
              </Alert>
            )}
                </form>
            </div>
        </div>
    )

}