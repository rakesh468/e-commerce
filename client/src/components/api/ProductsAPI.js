import {useState,useEffect}from 'react';
import axios from "axios";


function ProductsAPI() {
    const [products,setproducts]=useState([]);
    const[callback,setcallback]=useState(false)
    const[categories,setcategories]=useState("")
    const[sort,setssort]=useState("")
    const [search,setsearch]=useState("")
    const[page,setpage]=useState(1);
    const[result,setresult]=useState(0)



    
    useEffect(()=>{
      const getproducts=async()=>{
        const res=await axios.get(`/api/products?limit=${page*9}&${categories}&${sort}&title[regex]=${search}`)
        setproducts(res.data.products)
        setresult(res.data.result)
        console.log(res)
    }
     getproducts()
    },[callback,categories,sort,search,page])

  return {
      products:[products,setproducts],
      callback:[callback,setcallback],
      categories:[categories,setcategories],
      sort:[sort,setssort],
      result:[result,setresult],
      page:[page,setpage],
      search:[search,setsearch]
  }
}

export default ProductsAPI