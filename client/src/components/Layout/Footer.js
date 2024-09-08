import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer bg-customgray text-customblack dark:text-customgray dark:bg-customblack p-4 ">
      <h1 className="text-center p-2">All Right Reserved &copy; Ecommerce </h1>
      <div className="p-2">
        <ul className="flex justify-center">
          <li className="px-2 hover:font-semibold">
            <NavLink to={"/about"}>About</NavLink>
          </li>
          <li className="px-2 hover:font-semibold ">
            <NavLink to={"/contact"}>Contact</NavLink>
          </li>
          <li className="px-2 hover:font-semibold">
            <NavLink to={"/policy"}>Policy</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
