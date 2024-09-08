import React, { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { PiLockKey } from "react-icons/pi";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/authContext";
import { useLocation } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });

      if (res.data.success) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className=" flex  h-[100vh]  justify-center bg-gradient-to-br from-[#ff00cc]  to-[#333399]  items-center">
        <div className="shadow-dark-lg h-[70vh] bg-white w-[50%] rounded-3xl flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className=" text-center w-full flex flex-col items-center font-poppins"
          >
            <div className="mb-8 flex flex-col">
              <span className="font-semibold mt-2 mx-2 text-purple-900 text-2xl   text-center">
                Login
              </span>

              <span className="text-black ">Sign in to your account</span>
            </div>

            <div className="mb-7 w-[50%] relative">
              <AiOutlineMail className="absolute left-3 text-purple-900 top-2 text-2xl" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 pl-10  focus:border-purple-900 focus:outline-none  w-full border-2 shadow-dark-lg border-white placeholder-customblack rounded-lg"
                type="email"
                placeholder="Email"
              ></input>
            </div>
            <div className="mb-3  w-[50%] relative">
              <PiLockKey className="absolute left-3 text-purple-900 top-2 text-2xl" />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 pl-10 focus:border-purple-900 focus:outline-none w-full border-2 shadow-dark-lg border-white placeholder-customblack rounded-lg "
                type="password"
                placeholder="Password"
              ></input>
            </div>
            <div className=" mb-5 hover:font-semibold text-end w-[50%] text-sm">
              <Link to={"/request-otp"}>Forgot Password?</Link>
            </div>
            <div className="mb-5 mt-3  ">
              <button
                className="p-2 w-[10rem] shadow-dark-lg hover:font-semibold bg-purple-900 text-white rounded-3xl "
                type="submit"
              >
                Sign In
              </button>
            </div>
            <p className="">
              Don't have an account?
              <span className="text-purple-900">
                <Link to={"/register"}>Create</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
