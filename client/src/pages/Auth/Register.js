import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { IoPersonOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { PiLockKey } from "react-icons/pi";
import { MdOutlinePhone } from "react-icons/md";
import { LuMapPin } from "react-icons/lu";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex h-[100vh] justify-center bg-gradient-to-br from-[#ff00cc]  to-[#333399] items-center ">
        <div className="shadow-dark-lg h-[70vh] bg-white  w-[50%] rounded-3xl flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className=" text-center w-full flex flex-col items-center font-poppins"
          >
            <div className="mb-6 flex flex-col">
              <span className="font-semibold mx-2 text-purple-900 text-2xl   text-center">
                Register
              </span>

              <span className="text-black ">Create your account</span>
            </div>

            <div className="mb-4 w-[50%] relative">
              <IoPersonOutline className="absolute left-3 text-purple-900 top-2 text-2xl" />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 pl-10  focus:border-purple-900 focus:outline-none  w-full border-2 shadow-dark-lg border-white placeholder-customblack rounded-lg"
                type="text"
                placeholder="Name"
              ></input>
            </div>
            <div className="mb-4 w-[50%] relative">
              <AiOutlineMail className="absolute left-3 text-purple-900 top-2 text-2xl" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 pl-10  focus:border-purple-900 focus:outline-none  w-full border-2 shadow-dark-lg border-white placeholder-customblack rounded-lg"
                type="email"
                placeholder="Email"
              ></input>
            </div>
            <div className="mb-4 w-[50%] relative">
              <PiLockKey className="absolute left-3 text-purple-900 top-2 text-2xl" />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 pl-10  focus:border-purple-900 focus:outline-none  w-full border-2 shadow-dark-lg border-white placeholder-customblack rounded-lg"
                type="password"
                placeholder="Password"
              ></input>
            </div>
            <div className="mb-4 w-[50%] relative">
              <MdOutlinePhone className="absolute left-3 text-purple-900 top-2 text-2xl" />

              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="p-2 pl-10  focus:border-purple-900 focus:outline-none  w-full border-2 shadow-dark-lg border-white placeholder-customblack rounded-lg"
                type="text"
                placeholder="Phone"
              ></input>
            </div>
            <div className="mb-4 w-[50%] relative">
              <LuMapPin className="absolute left-3 text-purple-900 top-2 text-2xl" />
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="p-2 pl-10  focus:border-purple-900 focus:outline-none  w-full border-2 shadow-dark-lg border-white placeholder-customblack rounded-lg"
                type="text"
                placeholder="Address"
              ></input>
            </div>
            <div className="mb-3 mt-3 ">
              <button
                className="p-2 w-[10rem] shadow-dark-lg hover:font-semibold bg-purple-900 text-white rounded-3xl "
                type="submit"
              >
                Sign Up
              </button>
            </div>
            <p className="">
              Already have an account?
              <span className="text-purple-900">
                <Link to={"/login"}>Sign In</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
