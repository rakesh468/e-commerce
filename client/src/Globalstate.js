import React,{createContext,useEffect,useState} from "react";
import ProductsAPI from "./components/api/ProductsAPI";
import axios from "axios";
import UserAPI from "./components/api/UserAPI";
import CategoryAPI from "./components/api/CategoryAPI";

export const Globalstate=createContext();

export const DataProvider=({children})=>{
    const[token,setToken]=useState(false)

    
    
    useEffect(()=>{
        const firstlogin=localStorage.getItem('firstlogin')
        if(firstlogin){
           
            const refreshToken=async()=>{
                const result=await axios.get("/user/refresh_token")
               setToken(result.data.accesstoken)
               setTimeout(()=>{
                   refreshToken()
               },10*60*1000)
            }
            refreshToken()
        }
        
    },[])

    const state={
        token:[token,setToken],
        productsAPI:ProductsAPI(),
        userAPI:UserAPI(token),
        categoryAPI:CategoryAPI()
    }

   
    return(
   
   <Globalstate.Provider value={state}>
            {children}
        </Globalstate.Provider>
    )
}
