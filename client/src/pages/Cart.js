import React, { useEffect, useState } from "react";
import { useCart } from "../context/cartContext";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/authContext";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";

const Cart = () => {
  const [cart, setCart] = useCart();
  const [total, setTotal] = useState(0);
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [successfullPayment, setSuccessfullPayment] = useState(false);
  // eslint-disable-next-line
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    setTotal(totalPrice);
  }, [cart]);

  // function to handle navbar shadow on scrolling products
  const handleNavbarScroll = (scrollTop) => {
    const navbar = document.getElementsByClassName("navbar")[0];

    if (navbar) {
      if (scrollTop === 0) navbar.classList.remove("shadow-dark-lg");
      else {
        navbar.classList.add("shadow-dark-lg");
      }
    }
  };

  // function to remove item from cart
  const removeItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));

      toast.success("remove item successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");

      if (data.response.success) {
        setClientToken(data.response.clientToken);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
    setId(auth?.user?.id);
    // eslint-disable-next-line
  }, [auth?.token]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payments", {
        id,
        cart,
        nonce,
      });
      if (data.success) {
        setLoading(false);
        setCart([]);
        localStorage.removeItem("cart");
        setSuccessfullPayment(true);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Layout>
        <div className="flex m-3 relative">
          <div
            onScroll={(e) => handleNavbarScroll(e.target.scrollTop)}
            style={{ scrollbarWidth: "none" }}
            className="p-2 bg-white w-[70%] overflow-y-auto h-[85vh]  "
          >
            <h1 className="px-6 text-2xl text-purple-900 font-semibold">
              Shopping Cart
            </h1>

            <div className="px-6 mb-3">
              {cart.length > 0
                ? `You have ${cart.length} items in your cart ${
                    auth.token ? " " : "please login to checkout cart"
                  }`
                : "Your cart is empty"}
            </div>
            <hr />
            <div className="flex flex-col w-[100%]  scrollbar-hide">
              <table
                className={`${successfullPayment ? "hidden" : "bg-white"}`}
              >
                <thead className="w-full">
                  <tr className="flex w-full pt-6 pb-6  text-purple-900 ">
                    <th className="text-center w-1/5 ">Image</th>
                    <th className="text-center w-1/5 ">Product Name</th>

                    <th className="text-center w-1/5 ">Category</th>
                    <th className="text-center w-1/5 ">Description</th>
                    <th className="text-center w-1/5 ">Remove</th>
                  </tr>
                </thead>
                {cart.map((p) => (
                  <>
                    <tr
                      onChange={() => setTotal((total) => (total += p.price))}
                      key={p._id}
                      className="flex w-[100%] my-1 mb-3"
                    >
                      <td className="items-center flex justify-center w-1/5">
                        <img
                          className=" w-[4rem] h-[4rem]"
                          src={`/api/v1/product/get-photo/${p._id}`}
                          alt={p.name}
                        />
                      </td>

                      <td className="items-center flex justify-center w-1/5">
                        {p?.name}
                      </td>
                      <td className="items-center flex justify-center w-1/5">
                        {p?.category?.name}
                      </td>
                      <td className="text-center w-1/5 ">
                        {p?.description.substring(0, 70)}...
                      </td>
                      <td className=" items-center flex justify-center w-1/5">
                        <button
                          type="button"
                          onClick={() => removeItem(p._id)}
                          className="bg-[#DC3545]  hover:scale-110 transition-transform duration-300 flex items-center justify-center text-sm text-white font-semibold p-2  rounded-lg w-[7rem]"
                        >
                          <MdDelete className="text-xl mr-1" />
                          Remove
                        </button>
                      </td>
                    </tr>
                    <hr></hr>
                  </>
                ))}
              </table>
            </div>
          </div>
          <div className="w-[30%]">
            <div className="my-4 mx-8 text-center">
              <span className=" text-xl text-purple-900 font-semibold">
                Subtotal: {total}
              </span>

              {!clientToken || !cart.length ? (
                ""
              ) : (
                <>
                  <div className="mt-10">
                    <DropIn
                      options={{
                        authorization: clientToken,
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                  </div>
                  <button
                    type="button"
                    className="cursor-pointer bg-purple-900 mt-3 ms-auto px-4 rounded-lg w-[10rem]  text-white p-2.5"
                    onClick={handlePayment}
                    // disabled={!loading || !auth.user.address || !instance}
                  >
                    {loading ? "Processing..." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
          {successfullPayment && (
            <div className="absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  ">
              <div className="flex flex-col items-center">
                <div className="flex justify-center ">
                  {/* <FaRegCheckCircle className="w-[7rem]   h-[7rem] text-purple-900" /> */}
                  <iframe
                    title="succesfull payment"
                    src="https://lottie.host/embed/bbf1be10-b67e-4791-8c2a-69dddd4cc964/iVt9AaaKBz.json"
                  ></iframe>
                </div>
                <div>
                  <span className="text-2xl  text-green-500 font-bold">
                    Payment Successfull
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Cart;
