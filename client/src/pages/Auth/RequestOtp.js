import axios from "axios";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineMail } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const RequestOtp = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/request-otp", { email });

      if (res.data.success) {
        toast.success(res.data.message);

        navigate("/verify-otp", { state: email });
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className=" flex  h-[100vh] bg-purple-800 justify-center bg-gradient-to-br from-[#ff00cc]  to-[#333399] items-center">
        <div className="shadow-dark-lg h-[70vh] bg-white w-[50%] rounded-3xl flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className=" w-[20rem] py-8 text-center font-poppins"
          >
            <div className="mb-7 flex flex-col">
              <span className="font-semibold mt-2 mx-2 text-purple-900 text-2xl   text-center">
                Request OTP
              </span>

              <span className="text-black ">Send request for OTP</span>
            </div>
            <div className="mb-10 relative">
              <AiOutlineMail className="absolute left-3 text-purple-900 top-2 text-2xl" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 pl-10  focus:border-purple-900 focus:outline-none  w-full border-2 shadow-dark-lg border-white placeholder-customblack rounded-lg"
                type="text"
                placeholder="Email"
              ></input>
            </div>
            <div className="mb-5 mt-3  ">
              <button
                type="submit"
                className="p-2 w-[10rem] shadow-dark-lg hover:font-semibold bg-purple-900 text-white rounded-3xl "
              >
                Request OTP
              </button>
            </div>
            <p className="">
              Back to
              <span className="text-purple-900">
                <Link to={"/login"}> SignIn </Link>
              </span>
              form
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default RequestOtp;
