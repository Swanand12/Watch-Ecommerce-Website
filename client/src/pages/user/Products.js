import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const backend_url = process.env.REACT_APP_BACKEND_URL;
  // function to get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${backend_url}/api/v1/product/get-products`
      );

      if (data.success) {
        toast.success(data.message);
        setProducts(data.product);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while getting products");
    }
  };

  // getting all categories on initial render
  useEffect(() => {
    getAllProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      let answer = window.prompt("Are You sure want to delete this product");
      if (!answer) return;
      const { data } = await axios.delete(
        `${backend_url}/api/v1/product/delete-product/${id}`
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

  return (
    <>
      <Layout>
        <div className="flex m-4">
          <div className="flex flex-wrap justify-center m-auto">
            {products.map((p) => (
              <div
                key={p._id}
                className="p-3 m-6 rounded-lg hover:scale-110 transition-transform duration-300 cursor-pointer shadow-dark-hz  w-[15rem] "
              >
                <div className="flex flex-col items-center  ">
                  <img
                    className="h-[10rem] m-2"
                    src={`${backend_url}/api/v1/product/get-photo/${p._id}`}
                    alt={p.name}
                  />
                  <div className="py-1 flex flex-col  items-center">
                    <h3 className="font-semibold p-1 text-lg">{p.name}</h3>
                    <h2 className="font-semibold p-1 text-xl">₹ {p.price}</h2>
                    <p className="text-sm p-1 text-gray-500 line-clamp-2">
                      {p.description}
                    </p>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        navigate(`/dashboard/admin/products/${p.slug}`);
                      }}
                      className=" w-[12rem] flex items-center justify-center mt-3 bg-[#007BFF] text-white p-2 rounded-lg"
                    >
                      <MdOutlineEdit className="text-xl mr-2" />
                      UPDATE PRODUCT
                    </button>
                    <button
                      onClick={() => deleteProduct(p._id)}
                      type="button"
                      className="w-[12rem] flex items-center justify-center mt-3 bg-[#DC3545] text-white  p-2 rounded-lg"
                    >
                      <MdDelete className="text-xl mr-2" />
                      DELETE PRODUCT
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Products;
