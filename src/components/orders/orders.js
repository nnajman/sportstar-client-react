import io from "socket.io-client";
import './orders.css';
import React, { useState, useEffect } from "react";
import Moment from 'moment';
import { Accordion, Card, Button } from "react-bootstrap";

function Orders(props) {

    //const socket = io.connect("http://localhost:8080");
    const [orders, setOrders] = useState([]);
     
    useEffect(() => {

        //TODO : listen to order event
      fetch('http://localhost:8080/Orders', {
        headers: {'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + props.token.token}})
      .then((response) => response.json())
      .then((data) => setOrders(data.orders.reverse()));
      
    //   socket.on('orderAdded', ()=>{
    //     fetch('http://localhost:8080/Orders', {
    //     headers: {'Content-Type': 'application/json',
    //               'Authorization': 'Bearer ' + props.token.token}})
    //   .then((response) => response.json())
    //   .then((data) => setOrders(data.orders.reverse()));
    // })
  }, []);

    return (
      <div>
        <img className="background" src="https://cdn.shopify.com/s/files/1/0059/0056/6597/products/photo-id-2008220827717-young-man-running-along-the-beach-in-morning_1200x800.jpg?v=1563890102" alt=""/>
        <div className="orders-container">
            <div className="center">
            <h1 className="title">Orders</h1>
            </div>
            <Accordion className="list">
                { orders.map((order,key) =>
                    <Card key={order._id}>    
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey={order._id}>
                                {order.firstName + " " + order.lastName  + " - " + Moment(order.dateCreated).format('lll')}
                            </Accordion.Toggle>
                        </Card.Header>
                        
                        <Accordion.Collapse eventKey={order._id}>
                        <Card.Body>
                            <ul>
                                
                            { order.products.map((product,key) =>
                                <li key={key}>{product.product.name} - size {product.size} , quantity {product.quantity}</li>
                            )}
                            
                        </ul>
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                )}
            </Accordion>     
        </div>
    </div>
    )
}

export default Orders;