import React from "react";
import  "./ProductItem.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import BtnRender from "./BtnRender";




function ProductItem({ product,isAdmin,deleteproduct,handlecheck }) {

  
  

  return (
    <Card className="product_card" >
      {
        isAdmin && <input type="checkbox" checked={product.checked} onChange={()=>handlecheck(product._id)}/>
      }
      <img src={product.images.url} alt=""  />
      <CardContent className="product_box">
        <h2 title={product.title}>{product.title}</h2>
        <span>${product.price}</span>
        <p>{product.description}</p>
      </CardContent>
    
      <BtnRender product={product} deleteproduct={deleteproduct}/>
    </Card>
  );
}

export default ProductItem;
