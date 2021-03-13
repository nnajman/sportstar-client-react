import io from "socket.io-client";
import React, { useState, useEffect } from "react";
import './clients-number.css';

function ClientsNumber() {
    const socket = io.connect("http://localhost:8080");
    let [number,setNumber] =  useState(0);

    useEffect(() => {
    socket.on('count', (count)=>{
        console.log('clients number: '+ count);
        setNumber(count);
    })
    },[number])
    return (
            <div className="clients-number alert alert-primary">
                current visitors number : 
            <span className="badge badge-pill badge-light clients-number-span">{number}</span>
            </div>
    );
}

export default ClientsNumber;