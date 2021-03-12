import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function EditProduct(props) {
   
    // const [productDetails, setProductDetails] = useState(null);
    const [name, setProductName] = useState(null);
    const [brand, setProductBrand] = useState(null);
    const [price, setProductPrice] = useState(null);
    const [image, setProductImage] = useState(null);
    const [error, setError] = useState("");
    const [stock, setStock] = useState([{
        size: '',
        quantity: ''
    }]);
    const history = useHistory();
    const productID = props.location.state.product.id;
    var imageFile;

    useEffect(() => {

        fetch('http://localhost:8080/Products/' + productID)
        .then((response) => response.json())
        .then((data) => { 
            // setProductDetails(data.product); 
                          setProductName(data.product.name);
                          setProductBrand(data.product.brand);
                          setProductPrice(data.product.price);
                          setProductImage(data.product.image);
                          setStock(data.product.stock);})
        .catch(error => console.log(error));
    }, [productID]);

    const handleSubmit = async e => {
        if (name === "" || brand === "" || price === "" || image === "") {
            setError("All fields required");
            return;
        } else {
            e.preventDefault();
            const message = await editProductFunc({
                name,
                brand,
                price,
                image,
                stock
            }, props.location.state.product.id, props.token);
            if (message.status === 404) {
                history.push("/NotFound");
            } else if (message.status !== 200) {
                setError("Authentication failed");
            } else {
                history.push("/Products");
            }
        }
    }

    const setImageFile = async e => {
        imageFile = e.target.files[0]
    }
    
    async function editProductFunc(credentials, id, token) {
        
        // var formBody = [];
        var formData = new FormData();
        const fileField = document.querySelector('input[type="file"]').files[0];

        for (var property in credentials) {
            if (property === 'image') {
                if (fileField) {
                    formData.append(property,fileField);
                }
            } else if (property === 'stock'){
                formData.append(property, JSON.stringify(credentials[property]));
            }
            else {
                formData.append(property,credentials[property]);
            }
        }
        return fetch('http://localhost:8080/Products/' + id, {
            method: 'PATCH',
            headers: {
                'Authorization': 'Bearer ' + token.token
            }, body: formData
            }).then((response) =>  {
                return response;
             })
            .catch(error => {
                if (error.status === 404)
                    history.push("/NotFound");
            });    
    }    

    const handleArrayChange = (event, index) => {
        var stockTemp = [...stock];
        if (+event.target.value > 0) {
            stockTemp[index][event.target.name] = Number(event.target.value);
            setStock( stockTemp);
        } 
      }

      const addActivity = (e) => {
        // if (state.length < 3) {
            var stockTemp = [...stock, {
                size: '',
                quantity: '',
            }]
        
            setStock( stockTemp )
        }
    //   }
      const removeElement = (e, index) => {
        if (stock.length > 1) {
          var stockTemp = [...stock]
          stockTemp.splice(index, 1)
          setStock( stockTemp )
        }
      }

    return (
        
        <div className="container rounded bg-white mt-5 center width-auto">
         <div className="row justify-content-center blue-background ">
            <div className="col-md-4 border-right">
                <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                    <h3 className="font-weight-bold">{name}</h3>
                    {(() => {
                        if (image){
                            return (
                                <img className="rounded-circle mt-5" src={"http://localhost:8080/" + image} width={160} alt=""/>
                            )
                        }              
                        return null;
                    })()}                    
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
                <div className="form-group col-md-6">
                        <label htmlFor="Name">Name</label>
                        {(() => {
                        if (name){
                            return (
                                <input type="Name" className="form-control" placeholder="Name" value={name}
                                onChange={ (e) => setProductName( e.target.value ) }/>                         )
                        }              
                        return null;
                    })()} 

                    </div>
                         <div className="form-group col-md-6">
                        <label htmlFor="Brand">Brand</label>
                        {(() => {
                        if (brand){
                            return (
                                <input type="Brand" className="form-control" placeholder="Brand" value={brand}
                                onChange={ (e) => setProductBrand( e.target.value ) }/>                               )
                        }              
                        return null;
                    })()} 

                    </div>
                </div>
                <div className="row mt-3">
                <div className="form-group col-md-6">
                        <label htmlFor="Price">Price in ₪</label>
                        {(() => {
                        if (price){
                            return (
                                <input type="Price" className="form-control" placeholder="Price ₪" value={price}
                                onChange={ (e) => {
                                    if (+e.target.value > 0)
                                        setProductPrice( e.target.value);
                                }}/>                           
                         )  }              
                        return null;
                    })()} 

                    </div>
                    <div className="form-group col-md-6">                    
                        <label htmlFor="file">Image</label>
                        <input type='file' className="form-control" 
                            onChange={ (e) => setImageFile( e ) } /> 
                    </div>
                </div>

                <ul className="list-group .overflow-auto">
                { stock.map((obj, index) => {
                    return (
                        <li key={index} className="nostyle  d-flex justify-content-between align-items-center" >
                            <div className="row mt-3">
                                <div className="form-group col-md-5"> 
                                    <label htmlFor="size">Size</label>
                                    <input type="number" className="form-control" name="size" value={obj.size} onChange={(e) => handleArrayChange(e, index)} />
                                </div>
                                <div className="form-group col-md-5"> 
                                    <label htmlFor="quantity">Quantity</label>
                                    <input type="number" className="form-control" name="quantity" value={obj.quantity} onChange={(e) => handleArrayChange(e, index)} />
                                </div>
                                <div className=""> 
                                    <IconButton type={"button"} onClick={(e) => removeElement(e,index)} ><DeleteIcon/></IconButton>
                                </div>
                            </div>
                            
                        </li>
                    )
                    })}         
                </ul>

                <button type={"button"} onClick={addActivity}>Add More Activity</button>

                <div className="mt-5 text-right"><button className="btn btn-primary profile-button" type="button"
                     onClick={handleSubmit}>Save Changes</button></div>
                </div>
                {error && (
                    <Alert severity="error" onClick={() => setError(null)}>
                         {error}
                    </Alert>
                 )}
            </div>
            </div>
      </div>
    )
}
