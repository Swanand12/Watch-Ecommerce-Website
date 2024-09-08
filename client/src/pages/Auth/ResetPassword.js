import React, { useState } from "react";
import axios from "axios";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState([false, false]);
  const location = useLocation();
  const email = location.state;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/v1/auth/reset-password", {
        newPassword,
        confirmPassword,
        email,
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

  const toggleVisibility = (index) => {
    setShowPassword((prev) => {
      const update = [...prev];
      update[index] = !update[index];
      return update;
    });
  };
  return (
    <>
      <div className=" flex  h-[100vh] bg-gradient-to-br from-[#ff00cc]  to-[#333399] justify-center items-center">
        <div className="shadow-dark-lg h-[70vh] bg-white w-[50%] rounded-3xl flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className=" w-[20rem] py-8 text-center   font-poppins"
          >
            <div className="mb-8 flex flex-col">
              <span className="font-semibold mt-2 mx-2 text-purple-900 text-2xl   text-center">
                Set New Password
              </span>

              <span className="text-black ">
                Set new password to SignIn to your account
              </span>
            </div>

            <div className="mb-5 relative">
              <input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="p-2 pr-10 focus:border-purple-900 focus:outline-none w-full border-2 shadow-dark-lg border-white placeholder-customblack rounded-lg "
                type={showPassword[0] ? "text" : "password"}
                placeholder="New Password"
              ></input>
              <button
                type="button"
                onClick={() => toggleVisibility(0)}
                className=" cursor-pointer absolute text-purple-900 text-2xl right-2 top-2"
              >
                {showPassword[0] ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </button>
            </div>
            <div className="mb-8 relative">
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="p-2 pr-10 focus:border-purple-900 focus:outline-none w-full border-2 shadow-dark-lg border-white placeholder-customblack rounded-lg "
                type={showPassword[1] ? "text" : "password"}
                placeholder="Confirm Password"
              ></input>
              <button
                type="button"
                onClick={() => toggleVisibility(1)}
                className=" cursor-pointer absolute text-purple-900 text-2xl right-2 top-2"
              >
                {showPassword[1] ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </button>
            </div>
            <div className="mb-5 mt-3  ">
              <button
                className="p-2 w-[10rem] shadow-dark-lg hover:font-semibold bg-purple-900 text-white rounded-3xl "
                type="submit"
              >
                Reset Password
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

export default ResetPassword;
