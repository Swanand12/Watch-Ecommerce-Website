import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/authContext";
import moment from "moment";
import { FaCheck } from "react-icons/fa6";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  // eslint-disable-next-line
  const [status, setStatus] = useState([
    "Not Processing",
    "Processed",
    "Shipped",
    "En Route",
    "Delivered",
  ]);
  const [currentStatus, setCurrentStatus] = useState("Not Processing");

  // eslint-disable-next-line
  const [auth, setAuth] = useAuth();

  const currentIndex = status.indexOf(currentStatus);

  const userid = auth?.user?.id;
  const getOrders = async () => {
    try {
      const { data } = await axios.get(`/api/v1/order/orders/${userid}`);
      if (data) {
        setOrders(data?.orders);

        toast.success("Successfully get orders");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while getting orders");
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
    // eslint-disable-next-line
  }, [auth?.token]);

  const handleShowProducts = (Id, productList, statusValue) => {
    if (selectedOrderId === Id) {
      setSelectedOrderId(null);
      setProducts([]);
    } else {
      setSelectedOrderId(Id);
      setProducts(productList);
      setCurrentStatus(statusValue);
    }
  };
  return (
    <Layout>
      <div className="flex justify-center w-full flex-col items-center  ">
        {selectedOrderId && (
          <div className=" w-[80%] ">
            <h1 className="my-5 text-purple-900 font-semibold text-2xl text-center">
              Order Status
            </h1>
            <div className="w-full flex flex-col items-center my-4">
              <div className=" flex justify-between relative">
                {status.map((s, i) => (
                  <>
                    <div className="flex flex-col w-full items-center ">
                      <span className="w-[8rem] text-purple-900 font-semibold text-center">
                        {s}
                      </span>
                      <span
                        className={`h-[2rem]   my-3 rounded-full w-[2rem] ${
                          i <= currentIndex ? "bg-purple-900" : "bg-gray-400"
                        }`}
                      ></span>
                      <FaCheck
                        className={`absolute top-11 ${
                          i <= currentIndex ? "text-white" : "text-gray-400"
                        } `}
                      />
                    </div>
                  </>
                ))}{" "}
                <div className=" h-[8px] w-[calc(100%-8rem)] left-[4rem] bg-gray-400 absolute z-[-1] top-12">
                  <div
                    style={{ width: `${currentIndex * 25}%` }}
                    className={` h-[8px]  bg-purple-900 `}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col justify-center w-[100%]   items-center">
          <h1
            className={`${
              selectedOrderId === null
                ? "hidden"
                : "mb-10 mt-6 text-purple-900 font-semibold text-2xl text-center"
            }`}
          >
            Ordered Products
          </h1>
          <div className="flex justify-center w-full flex-wrap items-center">
            {selectedOrderId &&
              products.map((p) => {
                return (
                  <div
                    key={p._id}
                    className="p-3 m-6 rounded-lg hover:scale-110 transition-transform duration-300 cursor-pointer shadow-dark-hz  w-[15rem] "
                  >
                    <div className="flex flex-col items-center  ">
                      <img
                        className="h-[10rem] m-2"
                        src={`/api/v1/product/get-photo/${p._id}`}
                        alt={p.name}
                      />
                      <div className="py-1 flex flex-col  items-center">
                        <h3 className="font-semibold p-1 text-lg font-playfair">
                          {p.name}
                        </h3>
                        <h2 className="font-semibold p-1 text-xl">
                          ₹ {p.price}
                        </h2>
                        <p className="text-sm p-1 text-gray-500 font-playfair line-clamp-2">
                          {p.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <table className="mt-5 mb-5 w-[80%] border-2 h-[fit-content]  bg-white">
          <thead className="w-full">
            <tr className="flex w-full pt-6 pb-6  text-purple-900 ">
              <th className="text-center w-1/5 ">#</th>
              <th className="text-center w-1/5 ">
                See Ordered Status & Products
              </th>

              <th className="text-center w-1/5 ">Time Since Order</th>
              <th className="text-center w-1/5 ">Payment Status</th>
              <th className="text-center w-1/5 ">Quantity</th>
            </tr>
          </thead>
          <hr />

          {orders.map((o, i) => {
            return (
              <>
                {/* <tbody> */}
                <tr className="flex  w-full justify-between py-3" key={i}>
                  <td className="text-center w-1/5 ">{i + 1}</td>
                  <td className="text-center w-1/5 flex justify-center">
                    <button
                      className={`${
                        selectedOrderId === o._id
                          ? "flex items-center justify-center font-semibold  border-b-2 border-b-black  cursor-pointer"
                          : "flex items-center justify-center border-b-2 border-b-black cursor-pointer"
                      }`}
                      onClick={() =>
                        handleShowProducts(o._id, o.products, o.status)
                      }
                    >
                      Order Status & Products
                    </button>
                  </td>

                  <td className="text-center w-1/5 ">
                    {moment(o.createdAt).fromNow()}
                  </td>
                  <td className="text-center w-1/5 ">
                    {o.payments.success ? "Success" : "Failed"}
                  </td>
                  <td className="text-center w-1/5 ">{o.products.length}</td>
                </tr>
                {/* </tbody> */}
                <hr />
              </>
            );
          })}
        </table>
      </div>
    </Layout>
  );
};

export default UserOrders;
