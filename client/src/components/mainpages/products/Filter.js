import React,{useContext} from 'react';
import { Globalstate } from '../../../Globalstate';


function Filter() {
    const state=useContext(Globalstate)
    const[category]=state.categoryAPI.category
    
    const[categories,setcategories]=state.productsAPI.categories
    const[sort,setsort]=state.productsAPI.sort
   const [search,setsearch]=state.productsAPI.search

const handlecategory=event =>{
    setcategories(event.target.value)
    setsearch("")
}

  return (
    <div className="filter_menu">

   <div className="row">
       <span>Filter: </span>
       <select name="category" value={categories} onChange={handlecategory}>
           <option value="">All Products</option>
            {
            category.map(category=>(
                <option value={"category="+category._id}
                key={category._id}>
                    {category.name}
                </option>
            ))
            }
       </select>

   </div>
   <input type="text" className="input-box"  value={search} placeholder="Search Product" onChange={event=>setsearch(event.target.value.toLocaleLowerCase())}/>
       
   <div className="row sort">
       <span>Sort By: </span>
       <select  value={sort} onChange={event=>setsort(event.target.value)}>
          <option value="">Newest </option>
          <option value="sort=oldest">Oldest </option>
          <option value="sort=-sold">Best Sale</option>
          <option value="sort=-price">Price:High-Low</option>
          <option value="sort=price">Price:Low-High</option>
       </select>

   </div>
      
    </div>
  )
}

export default Filter