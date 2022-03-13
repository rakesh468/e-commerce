import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Globalstate } from "../../../Globalstate";
// import Loading from '../utlis/loading/Loading';
import "./CreateProduct.css";
import { useHistory, useParams } from "react-router-dom";

function CreateProduct() {
  const initialState = {
    product_id: "",
    title: "",
    price: 0,
    description: "",
    content: "",
    category: "",
    _id: "",
  };
  const state = useContext(Globalstate);
  const [product, setproduct] = useState(initialState);
  const [category] = state.categoryAPI.category;
  const [images, setimages] = useState(false);

  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const history = useHistory();
  const param = useParams();

  const [products] = state.productsAPI.products;
  const [onedit, setonedit] = useState(false);
  const[callback,setcallback]=state.productsAPI.callback

  useEffect(() => {
    if (param.id) {
      setonedit(true);
      products.forEach((product) => {
        if (product._id === param.id) {
          setproduct(product);
          setimages(product.images);
        }
      })
    } else {
      setonedit(false);
      setproduct(initialState);
     
      setimages(false);
    }
  }, [param.id, products]);

  const handleUpload = async (event) => {
    event.preventDefault();
    try {
      if (!isAdmin) return alert("You are not an Admin");

      const file = event.target.files[0];

      if (!file) return alert("file not Exist");

      if (file.size > 1024 * 1024) return alert("Size is not large");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return alert("File Format is incorrect");

      let formData = new FormData();
      formData.append("file", file);

      const result = await axios.post("/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });

      setimages(result.data);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  const handledestory = async () => {
    try {
      if (!isAdmin) return alert("You are not an Admin");
      await axios.post(
        "/api/destory",
        { public_id: images.public_id },
        {
          headers: { Authorization: token },
        }
      );

      setimages(false);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  const handlechangeInput = (event) => {
    const { name, value } = event.target;
    setproduct({ ...product, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!isAdmin) return alert("You are not an Admin");
      if (!images) return alert("Image is not uploaded");
      if(onedit){
        await axios.put(`/api/products/${product._id}`, { ...product, images },
            {
              headers: { Authorization: token },
            }
          );

      }else{
        await axios.post(
            "/api/products",
            { ...product, images },
            {
              headers: { Authorization: token },
            }
          );

      }
     
      setcallback(!callback)
      
      
      history.push("/");
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  const styleupload = {
    display: images ? "block" : "none",
  };

  return (
    <div className="create_product">
      <div className="upload">
        <input type="file" name="file" id="file_up" onChange={handleUpload} />
        <div id="file_img" style={styleupload}>
          <img src={images ? images.url : ""} alt="" />
          <span onClick={handledestory}>X</span>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="product_id">Product ID:</label>
          <input
            type="text"
            name="product_id"
            id="product_id"
            value={product.product_id}
            onChange={handlechangeInput}
            disabled={onedit}
            required
          />
        </div>
        <div className="row">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            value={product.title}
            onChange={handlechangeInput}
            required
          />
        </div>
        <div className="row">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            name="price"
            id="price"
            value={product.price}
            onChange={handlechangeInput}
            required
          />
        </div>
        <div className="row">
          <label htmlFor="description">Description:</label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={product.description}
            row="5"
            onChange={handlechangeInput}
            required
          />
        </div>
        <div className="row">
          <label htmlFor="content">Content:</label>
          <textarea
            type="text"
            name="content"
            id="content"
            value={product.content}
            row="7"
            onChange={handlechangeInput}
            required
          />
        </div>
        <div className="row">
          <label htmlFor="categories">Categories:</label>
          <select
            name="category"
            value={product.category}
            onChange={handlechangeInput}
          >
            <option value="">Select a Category</option>
            {category.map((category) => (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">{onedit ? "Update" : "Create"}</button>
      </form>
    </div>
  );
}

export default CreateProduct;
