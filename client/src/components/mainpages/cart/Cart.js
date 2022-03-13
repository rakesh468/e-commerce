import React, { useContext, useState, useEffect } from "react";
import { Globalstate } from "../../../Globalstate";
import Paypalbtn from "./Paypalbtn";

import "./cart.css";
import axios from "axios";



function Cart() {
  const state = useContext(Globalstate);
  const [cart, setcart] = state.userAPI.cart;
  const [token] = state.token;
  // const [callback,setcallback]=state.userAPI.callback
  const [total, settotal] = useState(0);

  //adding payment in cart//
  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((previous, item) => {
        return previous + item.price * item.quantity;
      }, 0);
      settotal(total);
    };
    getTotal();
  }, [cart]);

  const addTocart = async (cart) => {
    await axios.patch(
      "/user/addcart",
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };

  //adding product in cart individually//
  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
        console.log(item);
      }
    });
    setcart([...cart]);
    addTocart(cart);
  };

  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });
    setcart([...cart]);
    addTocart(cart);
  };

  //remove product from cart//

  const removeproduct = (id) => {
    if (window.confirm("Do you want to Delete product")) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });
      setcart([...cart]);
      addTocart(cart);
    }
  };


  const tranSuccess=async(payment)=>{
    console.log(payment)
    const{paymentID,address}=payment;
    
    await axios.post("/api/payment",{cart,paymentID,address},{
      headers:{Authorization:token}
    })
    setcart([])
    addTocart([])
    alert("Order Placed Successfully")
    // setcallback(!callback)
  }
  

  if (cart.length === 0)
    return (
      <h2 style={{ textAlign: "center", fontSize: "3rem" }}>Cart is Empty</h2>
    );

  return (
    <div>
      {cart.map((product) => (
        <div className="detail cart" key={product._id}>
          <img src={product.images.url} alt="poster" />
          <div className="box-detail">
            <h2>{product.title}</h2>
            <h3> ${product.price * product.quantity}</h3>
            <p>{product.description}</p>
            <p>{product.content}</p>
            <div className="amount">
              <button onClick={() => decrement(product._id)}> - </button>
              <span>{product.quantity}</span>
              <button onClick={() => increment(product._id)}> + </button>
            </div>

            <div className="delete" onClick={() => removeproduct(product._id)}>
              {" "}
              X
            </div>
          </div>
        </div>
      ))}
      <div className="total">
        <h3>Total: $ {total}</h3>
        <Paypalbtn total={total}
        tranSuccess={tranSuccess}/>
      </div>
    </div>
  );
}

export default Cart;



