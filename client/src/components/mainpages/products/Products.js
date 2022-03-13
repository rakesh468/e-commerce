import React, { useContext, useState } from "react";
import { Globalstate } from "../../../Globalstate";
import ProductItem from "../utlis/productitem/ProductItem";
import "./Products.css";
import axios from "axios";
import Filter from "./Filter";
import Loadmore from "./Loadmore";

function Products() {
  const state = useContext(Globalstate);
  const [products, setproducts] = state.productsAPI.products;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [callback, setcallback] = state.productsAPI.callback;
  const[ischecked,setischecked]=useState(false);


  const handlecheck = (id) => {
   products.forEach(product=>{
     if(product._id===id) product.checked= !product.checked
   })
   setproducts([...products])
  };

  const deleteproduct = async (id, public_id) => {
    try {
      const destoryimg = await axios.post(
        "/api/destory",
        { public_id },
        {
          headers: { Authorization: token },
        }
      );
      const deleteproduct = await axios.delete(`/api/products/${id}`, {
        headers: { Authorization: token },
      });
      await destoryimg;
      await deleteproduct;
      setcallback(!callback);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  const checkall=()=>{
    products.forEach(product=>{
      product.checked = !ischecked
    })
    setproducts([...products])
    setischecked(!ischecked)
  }

  const deleteall=()=>{
    products.forEach(product=>{
      if(product.checked) deleteproduct(product._id,product.images.public_id)
    })
  }
  return (
    <>
    <Filter/>
    {
      isAdmin && 
      <div className="delete-all">
        <span>Select All</span>
        <input type="checkbox"checked={ischecked} onChange={checkall}/>
        <button onClick={deleteall}>Delete All</button>

      </div>
    }
      <div className="products">
        {products.map((product) => {
          return (
            <ProductItem
              key={product._id}
              product={product}
              isAdmin={isAdmin}
              deleteproduct={deleteproduct}
              handlecheck={handlecheck}
            />
          );
        })}
      </div>
      <Loadmore/>
    </>
  );
}

export default Products;
