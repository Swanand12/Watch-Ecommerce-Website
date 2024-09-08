import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Select } from "antd";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const UpdateProduct = () => {
  const { Option } = Select;
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [id, setId] = useState("");
  const params = useParams();

  // function to update product
  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      const products = new FormData();
      products.append("name", name);
      products.append("description", description);
      products.append("price", price);
      products.append("quantity", quantity);
      products.append("category", category);
      products.append("shipping", shipping);
      // eslint-disable-next-line
      {
        photo && products.append("photo", photo);
      }
      console.log(photo);

      const { data } = await axios.put(
        `/api/v1/product/update-product/${id}`,
        products
      );

      if (data.success) {
        toast.success(data.message);
        console.log(data.product);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while creating Product");
    }
  };

  // function to handle delete product
  const deleteProduct = async () => {
    try {
      let answer = window.prompt("Are You sure want to delete this product");
      if (!answer) return;
      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${id}`
      );
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while deleting product");
    }
  };

  // function to get single Product
  const getSingleProduct = async () => {
    try {
      console.log("err");
      console.log(params.slug);
      const { data } = await axios.get(
        `/api/v1/product/single-product/${params.slug}`
      );
      if (data.success) {
        toast.success(data.message);
        console.log(data.product);
        setName(data.product.name);
        setDescription(data.product.description);
        setPrice(data.product.price);
        setQuantity(data.product.quantity);
        setCategory(data.product.category._id);
        setShipping(data.product.shipping);
        setId(data.product._id);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error While Getting Single product");
    }
  };

  // function to get all category
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-all-category");
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // getting all categories and also product for update on initial render
  useEffect(() => {
    getSingleProduct();
    getAllCategories();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Layout>
        <div className="w-full">
          <h1 className="mb-10 mt-8 text-purple-900 font-semibold text-2xl text-center">
            Update Product
          </h1>
          <div className="m-3 flex w-full justify-center text-center">
            <div className="w-1/3 m-3 mr-5 flex flex-col justify-center">
              <div className="mb-5  ">
                {photo ? (
                  <>
                    <h2 className="mb-3 text-purple-900 text-lg font-semibold">
                      Preview Image
                    </h2>
                    <div className="flex justify-center my-10 flex items-center h-[15rem] ">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="Preview-image"
                      ></img>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="mb-3 text-purple-900 text-lg font-semibold">
                      Preview Image
                    </h2>
                    <div className="flex justify-center my-10 flex items-center  h-[15rem] ">
                      <img
                        src={`/api/v1/product/get-photo/${id}`}
                        alt="Preview-image"
                      ></img>
                    </div>
                  </>
                )}
              </div>{" "}
              <div className="m-3 w-full flex justify-center">
                <label className="p-2.5 cursor-pointer w-[80%] block shadow-dark-lg hover:font-semibold bg-purple-900 text-white rounded-lg ">
                  {photo ? photo.name : "Upload Photo"}

                  <input
                    type="file"
                    name="photo"
                    onChange={(e) => {
                      setPhoto(e.target.files[0]);
                    }}
                    accept="image/*"
                    hidden
                  ></input>
                </label>
              </div>
            </div>
            <div className="w-1/3  m-3">
              <div></div>
              <div className="flex flex-col ">
                <div className="text-start text-purple-900 font-semibold text-lg mr-2">
                  Category
                </div>
                <Select
                  className="p-2 pl-7 mb-5 text-start font-poppins focus:border-purple-900 focus:outline-none  w-full border-b-2 shadow-dark-bt border-white placeholder-customblack rounded-lg"
                  size="large"
                  bordered={false}
                  onChange={(value) => {
                    setCategory(value);
                  }}
                  showSearch={true}
                  placeholder="Select Category"
                  value={category}
                >
                  {categories.map((c) => (
                    <Option value={c._id} key={c._id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex">
                  <div className="flex flex-col mr-3">
                    <div className="text-start text-purple-900 font-semibold text-lg mr-2">
                      Name
                    </div>
                    <input
                      type="text"
                      value={name}
                      className="p-2 pl-10 mb-5 font-poppins focus:border-purple-900 focus:outline-none  w-full border-b-2 shadow-dark-bt border-white placeholder-customblack rounded-lg"
                      placeholder="Product Name"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    ></input>
                  </div>
                  <div className="flex flex-col ">
                    <div className="text-start text-purple-900 font-semibold text-lg mr-2">
                      Quantity
                    </div>
                    <input
                      type="number"
                      value={quantity}
                      className="p-2 pl-10 mb-5 font-poppins focus:border-purple-900 focus:outline-none  w-full border-b-2 shadow-dark-bt border-white placeholder-customblack rounded-lg"
                      placeholder="Quantity"
                      onChange={(e) => {
                        setQuantity(e.target.value);
                      }}
                    ></input>
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <div className="text-start text-purple-900 font-semibold text-lg mr-2">
                    Description
                  </div>
                  <input
                    type="text"
                    value={description}
                    className="p-2 pl-10 mb-5  font-poppins focus:border-purple-900 focus:outline-none  w-full border-b-2 shadow-dark-bt border-white placeholder-customblack rounded-lg"
                    placeholder="Product Description"
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="flex w-full">
                  <div className="flex flex-col w-[50%] mr-3">
                    <div className="text-start text-purple-900 font-semibold text-lg mr-2">
                      Price
                    </div>
                    <input
                      type="number"
                      value={price}
                      className="p-2 pl-10 mb-5 font-poppins focus:border-purple-900 focus:outline-none  w-full border-b-2 shadow-dark-bt border-white placeholder-customblack rounded-lg"
                      placeholder="Product Price"
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                    ></input>
                  </div>

                  <div className="flex flex-col w-[50%]">
                    <div className="text-start text-purple-900 font-semibold text-lg mr-2">
                      Shipping
                    </div>
                    <Select
                      className="p-2 pl-7 text-start mb-5 font-poppins focus:border-purple-900 focus:outline-none  w-full border-b-2 shadow-dark-bt border-white placeholder-customblack rounded-lg"
                      size="large"
                      bordered={false}
                      showSearch
                      placeholder="Shipping Yes or No"
                      value={shipping ? "Yes" : "No"}
                      onChange={(value) => {
                        setShipping(value);
                      }}
                    >
                      <Option value={1}>Yes</Option>
                      <Option value={0}>No</Option>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="my-3 flex  justify-center ">
                <button
                  className=" w-[10rem] mr-3 bg-[#007BFF] text-white p-2 rounded-lg"
                  type="button"
                  onClick={updateProduct}
                >
                  Update Product
                </button>
                <button
                  className="w-[10rem] bg-[#DC3545] text-white  p-2 rounded-lg"
                  type="button"
                  onClick={deleteProduct}
                >
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UpdateProduct;
