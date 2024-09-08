import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/authContext";
import moment from "moment";
import { Select } from "antd";

const { Option } = Select;

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  // eslint-disable-next-line
  const [status, setStatus] = useState([
    "Not Processing",
    "Processing",
    "Shipped",
    "En Route",
    "Delivered",
  ]);

  // eslint-disable-next-line
  const [auth, setAuth] = useAuth();

  const getAllOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/order/all-orders");
      if (data) {
        setOrders(data?.orders);

        toast.success("Successfully get orders");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getAllOrders();
    // eslint-disable-next-line
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `/api/v1/order/update-status/${orderId}`,
        { status: value }
      );
      if (data.success) {
        setOrders(data?.orders);
        getAllOrders();
        toast.success("Successfully Updated Status");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout>
        <div className="flex justify-center w-full flex-col items-center   ">
          <h1 className="mb-10 mt-6 text-purple-900 font-semibold text-2xl text-center">
            Buyers Order
          </h1>

          <table className="mx-5 mb-5 border-2 w-[80%]   bg-white">
            <thead className="w-full">
              <tr className="flex w-full pt-6 pb-6  text-purple-900 ">
                <th className="text-center w-1/6 ">#</th>
                <th className="text-center w-1/6 ">Status</th>
                <th className="text-center w-1/6 ">Buyer</th>
                <th className="text-center w-1/6 ">a</th>
                <th className="text-center w-1/6 ">Payment Status</th>
                <th className="text-center w-1/6 ">Quantity</th>
              </tr>
            </thead>
            <hr />

            {orders.length &&
              orders.map((o, i) => {
                return (
                  <>
                    {/* <tbody> */}
                    <tr className="flex  w-full justify-between py-3 " key={i}>
                      <td className="text-center w-1/6 ">{i + 1}</td>
                      <td className="text-center w-1/6">
                        <Select
                          onChange={(value) => {
                            handleChange(o?._id, value);
                          }}
                          //   defaultValue={o.status}
                          value={o?.status}
                          bordered={false}
                        >
                          {status?.map((s, j) => (
                            <Option key={j} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      {/* <td className="text-center w-1/6 ">{o.status}</td> */}
                      <td className="text-center w-1/6 ">{o.buyers.name}</td>

                      <td className="text-center w-1/6 ">
                        {moment(o.createdAt).fromNow()}
                      </td>
                      <td className="text-center w-1/6 ">
                        {o.payments.success ? "Success" : "Failed"}
                      </td>
                      <td className="text-center w-1/6 ">
                        {o.products.length}
                      </td>
                    </tr>
                    {/* </tbody> */}
                    <hr />
                  </>
                );
              })}
          </table>
        </div>
      </Layout>
    </>
  );
};

export default AdminOrders;
