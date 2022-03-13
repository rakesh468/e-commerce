import React,{useContext} from "react";
import { Link } from "react-router-dom";
import { Globalstate } from "../../../../Globalstate";

function BtnRender({ product,deleteproduct }) {
  
  const state = useContext(Globalstate);
  
  const [isAdmin] = state.userAPI.isAdmin;
  const addCart=state.userAPI.addCart
  

  return (
    <div className="row-btn">
      {

        isAdmin ?
        <>
        <Link id="btn_buy" to="#!" onClick={()=>deleteproduct(product._id,product.images.public_id)}>
        Delete
      </Link>
      <Link id="btn_view" to={`/edit_product/${product._id}`}>
        Edit
      </Link>
      </>
      :<>
      <Link id="btn_buy" to="#!" onClick={()=>addCart(product)}>
        Buy
      </Link>
      <Link id="btn_view" to={`/detail/${product._id}`}>
        View
      </Link>
      </>
    }
    </div>
  );
}

export default BtnRender;
