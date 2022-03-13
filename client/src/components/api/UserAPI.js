import { useState, useEffect } from "react";
import axios from "axios";

function UserAPI(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart,setcart]=useState([])
  const [history,setHistory]=useState([])
  // const[callback,setcallback]=useState(false);


  //verify user or admin //
  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const result = await axios.get("/user/infor", {
            headers: {Authorization : token }
          })
          setIsLogged(true)
          result.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
           setcart(result.data.cart)
          
        } catch (error) {
          alert(error.response.data.msg);
        }
      }
      getUser()
    }
  },[token]);
   
//   useEffect(()=>{
//     if(token){
//       const getHistory=async ()=>{
         
//         if(isAdmin){
//           const result1=await axios.get("/api/payment",{headers:{Authorization:token}})
       
//         setHistory(result1.data)

//         }else{
//           const result1=await axios.get("/user/history",{headers:{Authorization:token}})
//         console.log(result1)
//         setHistory(result1.data)

//         }

        
//       }
//       getHistory()
//     }
// },[token,callback,isAdmin])

  // adding to cart//
  const addCart=async(product)=>{
    if(!isLogged) return alert("Please Login to continue buying")

    const check=cart.every(item=>{
      return item._id !== product._id
    })
     
    if(check){
      setcart([...cart,{...product,quantity:1}])

      await axios.patch("/user/addcart",{cart:[...cart,{...product,quantity:1}]},{
        headers:{Authorization:token}
      })
    }else{
      alert("This is product is alreday Added to cart")
    }
  }


  return {
      
      isLogged:[isLogged,setIsLogged],
      isAdmin:[isAdmin,setIsAdmin],
      cart:[cart,setcart],
      addCart:addCart,
      history:[history,setHistory]
      // callback:[callback,setcallback]
    
  }
}

export default UserAPI;
