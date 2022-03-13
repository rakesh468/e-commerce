import React, { useContext } from 'react';
import Products from './products/Products';
import Login from './auth/Login';
import Register from './auth/Register';
import Cart from './cart/Cart';
import Notfound from './utlis/not_found/Notfound';
import {Switch,Route} from "react-router-dom";
import DetailProduct from './detailproduct/DetailProduct';
import OrderHistory from './History/OrderHistory';
import OrderDetail from './History/OrderDetail';
import Category from './categories/Category';
import CreateProduct from './createProduct/CreateProduct';

import {Globalstate} from "../../Globalstate";



function Pages() {
  const state=useContext(Globalstate);

  const [isLogged]=state.userAPI.isLogged
  const[isAdmin]=state.userAPI.isAdmin
  return (
    <Switch>
      <Route path="/" exact component={Products}></Route>
      <Route path="/detail/:id" exact component={DetailProduct}></Route>
      <Route path="/login" exact component={isLogged ? Notfound :Login}></Route>
      <Route path="/register" exact component={isLogged ? Notfound :Register}></Route>

      
       <Route path="/create_product" exact component={isAdmin ? CreateProduct : Notfound}></Route>
       <Route path="/edit_product/:id" exact component={isAdmin ? CreateProduct : Notfound}></Route>
      <Route path="/cart" exact component={Cart}></Route>
      <Route path="/history"  exact component={isLogged ? OrderHistory : Notfound }></Route>
      <Route path="/history/:id"  exact component={isLogged ? OrderDetail : Notfound }></Route>

      <Route path="/category" exact component={isAdmin ? Category : Notfound}></Route>


      <Route path="*" exact component={Notfound}></Route>


    </Switch>
  )
}

export default Pages