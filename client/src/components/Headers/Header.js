import React, {  useContext, useState } from "react";
import { Globalstate } from "../../Globalstate";
import "./Header.css";
import menu from "./icon/menu.svg";
import close from "./icon/close.svg";
import Cart from "./icon/Cart.svg";
import { Link } from "react-router-dom";
import axios from "axios";

function Header() {
  const state = useContext(Globalstate);
  const [isLogged]=state.userAPI.isLogged
  const[isAdmin]=state.userAPI.isAdmin
  const [cart]=state.userAPI.cart
  const[Menu,setMenu]=useState(false)

   const logoutUser=async()=>{
        await axios.get("/user/logout")
        localStorage.removeItem("firstlogin")
        window.location.href="/";
        // setIsAdmin(false)
        // setIsLogged(false)
        
   }

  const adminRouter=()=>{
    return(
      <>
      <li><Link to="/create_product"><h4>Create Product</h4></Link></li>
      <li><Link to="/category"><h4>Categories</h4></Link></li>
      </>
    )
  }

  const loggedRouter=()=>{
    return(
      <>
      <li><Link to="/history"><h4>History</h4></Link></li>
      <li><Link to="/" onClick={logoutUser}><h4>Logout</h4></Link></li>
      </>
    )
  }

  
  const stylemenu={
    left: Menu ? 0 :"-100%"
  }
  return (
    <header>
      <div className="menu" onClick={()=>setMenu(!Menu)}>
        <img src={menu} alt="menu-bar" width="30" />
      </div>
      <div className="logo">
        <h1>
          <Link to="/">{isAdmin ? "Admin" :"Amazon"}</Link>
        </h1>
      </div>

     
     {
       isAdmin ? " "
         : <div className="cart-icon">
          <span>{cart.length}</span>
          <Link to="/cart">
            <img src={Cart} alt="" width="30" />
          </Link>
        </div>
       

     }
      
      <ul style={stylemenu}>
        
        <li ><h4><Link to="/"> {isAdmin ? "Products":"Shop"} </Link></h4></li>
        {isAdmin && adminRouter()}
        {
          isLogged ? loggedRouter() : <li><Link to="/login"><h4>Login</h4></Link></li>
        }
       <li onClick={()=>setMenu(!Menu)}> <img src={close} alt="" width="30" className="menu" /></li>
      </ul>
    </header>
  );
}

export default Header;
