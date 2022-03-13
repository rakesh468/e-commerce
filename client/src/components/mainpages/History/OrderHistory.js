import React, { useContext,useEffect } from "react";
import { Globalstate } from "../../../Globalstate";
import { Link } from "react-router-dom";
import axios from "axios";

function OrderHistory() {
  const state = useContext(Globalstate);
  const [history,setHistory] = state.userAPI.history;
  const[isAdmin]=state.userAPI.isAdmin
  const [token]=state.token

  useEffect(()=>{
    if(token){
      const getHistory=async ()=>{
         
        if(isAdmin){
          const result1=await axios.get("/api/payment",{headers:{Authorization:token}})
       
        setHistory(result1.data)

        }else{
          const result1=await axios.get("/user/history",{headers:{Authorization:token}})
        console.log(result1)
        setHistory(result1.data)

        }

        
      }
      getHistory()
    }
},[token,isAdmin,setHistory])
  return (
      
    <div className="history-page">
      <h2>History</h2>

      <h4>you have {history.length} Orders</h4>

      <div >
        <table>
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Date of Purchase</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
            history.map(items => (
              <tr key={items._id}>
                <td>{items.paymentID}</td>
                <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                <td>
                
                  <Link to={`/history/${items._id}`}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderHistory;
