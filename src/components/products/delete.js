import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function DeleteProduct(props) {

    const history = useHistory();
    const [productDetails, setProductDetails] = useState(null);
    const [stock, setStock] = useState([{
        size: '',
        quantity: ''
    }]);
    const productID = props.location.state.product.id;

    useEffect(() => {
        fetch('http://localhost:8080/Products/'+productID)
        .then((response) => response.json())
        .then((data) => { setProductDetails(data.product);
            setStock(data.product.stock);})
        .catch(error => {
            if (error.status === 404)
                history.push("NotFound");
        });
            
    }, [productID]);

    if (productDetails === null)
        return "";
    
    const deleteProduct = () => {  

        if (props.token.token) {
            fetch('http://localhost:8080/Products/'+productID, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded',
                          'Authorization': 'Bearer ' + props.token.token},
                method:'delete'})
            .then(() => history.push("/Products"))
            .catch(error => {
                if (error.status === 404)
                    history.push("/NotFound");
            })
        }
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
                    <label htmlFor="button">שים לב - מחיקת מוצר יכולה להוביל לפגיעה באמינות היסטוריית ההזמנות *</label>

                </div>
                <div className="row mt-2">
                    
                    <div className="col-md-6">
                        <label htmlFor="Name">Name</label>
                        <input type="Name" className="form-control" placeholder="Name" defaultValue={productDetails.name} disabled /></div>
                    <div className="col-md-6">
                        <label htmlFor="Brand">Brand</label>
                        <input type="Brand" className="form-control" placeholder="Brand" defaultValue={productDetails.brand} disabled /></div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-6">
                        <label htmlFor="Price">Price</label>
                        <input type="Price" className="form-control" defaultValue={productDetails.price + " ₪"} placeholder="Price" disabled /></div>
                </div>
                <ul className="list-group .overflow-auto">
                { stock.map((obj, index) => {
                    return (
                        <li key={index} className="nostyle  d-flex justify-content-between align-items-center" >
                            <div className="row mt-3">
                                <div className="form-group col-md-5"> 
                                    <label htmlFor="size">Size</label>
                                    <input type="text" className="form-control" name="size" value={obj.size} disabled />
                                </div>
                                <div className="form-group col-md-5"> 
                                    <label htmlFor="quantity">Quantity</label>
                                    <input type="text" className="form-control" name="quantity" value={obj.quantity} disabled />
                                </div>
                            </div>
                            
                        </li>
                    )
                    })}         
                </ul>
                <div className="mt-5 text-right"><button className="btn delete-button" type="button"
                     onClick={deleteProduct}>Delete Product
                    </button></div>
                </div>
            </div>
            </div>
        </div>

    )

}
