import axios from "axios";
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa6";
import { useCart } from "../context/cartContext";
import toast from "react-hot-toast";
const ProductDetails = () => {
  const [product, setProduct] = useState([]);
  const params = useParams();
  const [cart, setCart] = useCart();
  const backend_url = process.env.REACT_APP_BACKEND_URL;
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${backend_url}/api/v1/product/single-product/${params.slug}`
      );

      if (data.success) {
        setProduct(data?.product);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Layout>
        <div className="flex m-3 w-full justify-center items-center">
          <div className="">
            <img
              className="h-[10rem] m-2 w-[400px] h-[400px]"
              src={`${backend_url}/api/v1/product/get-photo/${product._id}`}
              alt={product.name}
            />
          </div>

          <div className="px-6 py-4 w-[30%]">
            <div className="py-1 flex flex-col ">
              <h3 className="font-semibold p-1 text-lg">{product?.name}</h3>
              <span className="text-sm p-1 font-semibold">
                {product?.category?.name}
              </span>
              <p className="text-sm p-1 text-gray-500 line-clamp-2">
                {product.description}
              </p>
              <h2 className="font-semibold p-1 text-xl">₹ {product.price}</h2>
            </div>
            <div>
              <button
                type="button"
                onClick={() => {
                  setCart([...cart, product]);
                  localStorage.setItem(
                    "cart",
                    JSON.stringify([...cart, product])
                  );
                  toast.success("Item added to cart");
                }}
                className="bg-[#FFC107] flex items-center justify-center text-sm text-white font-semibold p-2 my-3 rounded-lg w-[10rem]"
              >
                <FaCartPlus className="text-xl mr-2" />
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ProductDetails;
