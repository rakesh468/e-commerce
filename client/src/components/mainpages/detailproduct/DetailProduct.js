import React,{useContext,useState,useEffect} from 'react';
import { useParams,Link } from 'react-router-dom';
import {Globalstate} from "../../../Globalstate";
import "./DetailProducts.css";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import ProductItem from '../utlis/productitem/ProductItem';


function DetailProduct() {
    const params=useParams();
    const state=useContext(Globalstate);
    console.log(params);

    const [products]=state.productsAPI.products
    const addCart=state.userAPI.addCart
    const [detailproduct,setdetailproduct]=useState([])
   
    useEffect(()=>{
        console.log("render")
        if(params.id){
            products.forEach(product=>{
                if(product._id=== params.id) setdetailproduct(product)
            })
        }
    },[params.id,products])
    if(detailproduct.length === 0)
    return null; 
    
  return (
      <>
    < Card className="detail">
        <img src={detailproduct.images.url} alt="poster"/>
        < CardContent className="box-detail">
            <div className="row">
                <h2>{detailproduct.title}</h2>
                <h6>#id:{detailproduct.product_id}</h6>
                </div>
                <span style={{color:"red"}}> ${detailproduct.price}</span>
                <p>{detailproduct.description}</p>
                <p>{detailproduct.content}</p>
                <p>Sold:{detailproduct.sold}</p>
                <CardActions >
                <Link to="/cart" className="cart" onClick={()=>addCart(detailproduct)}>Buy Now</Link>
                </CardActions>
        </ CardContent>

    </Card>
    <div>
        <h2>Related Products</h2>
        <div className="products">
            {
                products.map(product=>{
                    return product.category===detailproduct.category
                    ? <ProductItem key={product._id} product={product}/> : null

                })
            }

        </div>
    </div>
    </>
  )
}

export default DetailProduct