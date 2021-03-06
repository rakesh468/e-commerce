import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Globalstate } from "../../../Globalstate";

function OrderDetail() {
  const state = useContext(Globalstate);
  const [history] = state.userAPI.history;
  const [orderdetails, setorderdetails] = useState([]);

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      history.forEach((item) => {
        if (item._id === params.id) setorderdetails(item);
      });
    }
  }, [params.id, history]);

  console.log(orderdetails);

  if(orderdetails.length === 0) return null;

  return (
      <div className="history-page">
       <table >
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Postal Code</th>
              <th>Country Code</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td>{orderdetails.address.recipient_name}</td>
                <td>{orderdetails.address.line1 + "-" +orderdetails.address.city}</td>
                <td>{orderdetails.address.postal_code}</td>
                <td>{orderdetails.address.country_code}</td>
            </tr>
          </tbody>
        </table>
        <table style={{margin:"30px 0px"}}>
          <thead>
            <tr>
              <th></th>
              <th>Products</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
              {

                  orderdetails.cart.map(item=>(
                    <tr key={item._id}>
                    <td><img src={item.images.url} alt={item.title}/></td>
                    <td>{item.title}</td>
                    <td>{item.quantity}</td>
                    <td>$ {item.price * item.quantity}</td>
                </tr>

                  ))
              }
            
          </tbody>
        </table>
        
      </div>
  )
}

export default OrderDetail;
