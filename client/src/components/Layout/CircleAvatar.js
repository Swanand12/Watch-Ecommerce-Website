import React from "react";
import { Link } from "react-router-dom";

const CircleAvatar = ({ email }) => {
  const avatar = email.charAt(0).toUpperCase();
  return (
    <Link to={"/dashboard/user/profile"}>
      <li className="w-10 h-10 group mr-6 flex justify-center items-center  text-xl hover:font-semibold rounded-full bg-purple-900 text-white">
        {avatar}
      </li>
    </Link>
  );
};

export default CircleAvatar;
