import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/authContext";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { IoPersonOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { PiLockKey } from "react-icons/pi";
import { MdOutlinePhone } from "react-icons/md";
import { LuMapPin } from "react-icons/lu";
import { MdOutlineEdit } from "react-icons/md";

const UserProfile = () => {
  // eslint-disable-next-line
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const backend_url = process.env.REACT_APP_BACKEND_URL;
  const [edit, setEdit] = useState([false, false, false, false, false]);

  useEffect(() => {
    const { name, email, password, phone, address } = auth.user;
    setName(name);
    setEmail(email);
    setPassword(password);
    setPhone(phone);
    setAddress(address);
  }, [auth.user]);
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(`${backend_url}/api/v1/auth/profile`, {
        name,
        email,
        password,
        phone,
        address,
      });

      if (data.success) {
        toast.success(data.message);

        setAuth({ ...auth, user: data?.updatedUser });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (index) => {
    setEdit((prevState) => {
      const updateEditState = [...prevState];
      updateEditState[index] = !updateEditState[index];
      return updateEditState;
    });
  };

  return (
    <Layout>
      <div className="flex h-[95vh] bg-gradient-to-br from-[#ff00cc]  to-[#333399] justify-center bg-[#DDDDDD] items-center">
        <div className="shadow-dark-lg h-[70vh] bg-white w-[50%] rounded-3xl flex justify-center items-center">
          <form
            onSubmit={handleUpdate}
            className=" text-center w-full flex flex-col items-center font-poppins"
          >
            <div className="mb-10 flex flex-col">
              <span className="font-semibold mx-2 text-purple-900 text-2xl   text-center">
                User Profile
              </span>
              <span className="text-black ">
                Edit profile by clicking on edit icon
              </span>
            </div>

            <div className="mb-4 w-[50%] relative">
              <IoPersonOutline className="absolute left-3 text-purple-900 top-2 text-2xl" />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`${
                  edit[0] ? "" : "bg-[#DDDDDD]"
                } p-2 pl-10 pr-10 focus:border-purple-900 focus:outline-none  w-full border-b-2 shadow-dark-bt border-white placeholder-customblack rounded-lg`}
                type="text"
                placeholder="Name"
                disabled={!edit[0]}
              ></input>
              <MdOutlineEdit
                onClick={() => handleEdit(0)}
                className="absolute right-3 text-purple-900 top-2 text-2xl"
              />
            </div>
            <div className="mb-4 w-[50%] relative">
              <AiOutlineMail className="absolute left-3 text-purple-900 top-2 text-2xl" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${
                  edit[1] ? "" : "bg-[#DDDDDD]"
                } p-2 pl-10 pr-10 focus:border-purple-900 focus:outline-none  w-full border-b-2 shadow-dark-bt border-white placeholder-customblack rounded-lg`}
                type="email"
                placeholder="Email"
                disabled={!edit[1]}
              ></input>
              <MdOutlineEdit
                onClick={() => handleEdit(1)}
                className="absolute right-3 text-purple-900 top-2 text-2xl"
              />
            </div>
            <div className="mb-4 w-[50%] relative">
              <PiLockKey className="absolute left-3 text-purple-900 top-2 text-2xl" />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${
                  edit[2] ? "" : "bg-[#DDDDDD]"
                } p-2 pl-10  pr-10 focus:border-purple-900 focus:outline-none  w-full border-b-2 shadow-dark-bt border-white placeholder-customblack rounded-lg`}
                type="password"
                placeholder="Password"
                disabled={!edit[2]}
              ></input>
              <MdOutlineEdit
                onClick={() => handleEdit(2)}
                className="absolute right-3 text-purple-900 top-2 text-2xl"
              />
            </div>
            <div className="mb-4 w-[50%] relative">
              <MdOutlinePhone className="absolute left-3 text-purple-900 top-2 text-2xl" />

              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`${
                  edit[3] ? "" : "bg-[#DDDDDD]"
                } p-2 pl-10 pr-10 focus:border-purple-900 focus:outline-none  w-full border-b-2 shadow-dark-bt border-white placeholder-customblack rounded-lg`}
                type="text"
                placeholder="Phone"
                disabled={!edit[3]}
              ></input>
              <MdOutlineEdit
                onClick={() => handleEdit(3)}
                className="absolute right-3 text-purple-900 top-2 text-2xl"
              />
            </div>
            <div className="mb-4 w-[50%] relative">
              <LuMapPin className="absolute left-3 text-purple-900 top-2 text-2xl" />
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={`${
                  edit[4] ? "" : "bg-[#DDDDDD]"
                } p-2 pl-10 pr-10 focus:border-purple-900 focus:outline-none  w-full border-b-2 shadow-dark-bt border-white placeholder-customblack rounded-lg`}
                type="text"
                placeholder="Address"
                disabled={!edit[4]}
              ></input>
              <MdOutlineEdit
                onClick={() => handleEdit(4)}
                className="absolute right-3 text-purple-900 top-2 text-2xl"
              />
            </div>
            <div className="mb-3 mt-3 ">
              <button
                className="p-2 w-[10rem] shadow-dark-lg hover:font-semibold bg-purple-900 text-white rounded-3xl "
                type="submit"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
