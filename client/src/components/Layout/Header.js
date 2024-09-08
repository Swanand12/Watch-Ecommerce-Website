import { Link, NavLink } from "react-router-dom";

import { FaCartPlus } from "react-icons/fa6";
import { Select } from "antd";
import { useAuth } from "../../context/authContext";
import CircleAvatar from "./CircleAvatar";
import { useCart } from "../../context/cartContext";
import { useState } from "react";

const Header = () => {
  const { Option } = Select;

  const [auth, setAuth] = useAuth();
  const [selected, setSelected] = useState("all-products");
  // eslint-disable-next-line
  const [cart, setCart] = useCart();

  const handleLogOut = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };

  return (
    <>
      <nav
        className="
           
        navbar fixed z-10 w-full flex justify-between items-center px-4  text-purple-900 bg-white font-poppins h-16"
      >
        <h1 className="text-2xl font-semibold">
          <Link to="/">BuyCommerce</Link>
        </h1>

        <div className=" items-center">
          <ul className="flex items-center">
            {!auth.user ? (
              <></>
            ) : (
              <>
                <CircleAvatar email={auth.user.email} />
              </>
            )}

            <li className="px-2 hover:font-semibold">
              <NavLink to={"/"}>Home</NavLink>
            </li>

            {!auth.user ? (
              <>
                <li className="px-2 hover:font-semibold">
                  <NavLink to={"/login"}>Login</NavLink>
                </li>
                <li className="px-2 hover:font-semibold">
                  <NavLink to={"/register"}>SignUp</NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="px-2 hover:font-semibold">
                  <NavLink
                    to={
                      auth.user.role === 1
                        ? "/dashboard/admin"
                        : "/dashboard/user"
                    }
                  >
                    {auth.user.role === 1 ? "Admin" : "User"}
                  </NavLink>
                </li>
                {auth?.user?.role === 1 ? (
                  <>
                    <li className="px-2 hover:font-semibold">
                      <NavLink to={"/dashboard/admin/manage-category"}>
                        Categories
                      </NavLink>
                    </li>

                    <Select
                      className="font-poppins pt-1 text-purple-900 "
                      bordered={false}
                      size="large"
                      onChange={(value) => setSelected(value)}
                      value={selected}
                    >
                      <Option value={"all-products"}>
                        <NavLink
                          className="text-purple-900"
                          to={"/dashboard/admin/products"}
                        >
                          All Product
                        </NavLink>
                      </Option>
                      <Option value={"create-products"}>
                        <NavLink
                          className="text-purple-900"
                          to={"/dashboard/admin/create-products"}
                        >
                          Create Product
                        </NavLink>
                      </Option>
                    </Select>
                    <li className="px-2 hover:font-semibold">
                      <NavLink to={"/dashboard/admin/orders"}>Orders</NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="px-2 hover:font-semibold">
                      <NavLink to={"/about"}>About</NavLink>
                    </li>

                    <li className="px-2 hover:font-semibold">
                      <NavLink to={"/dashboard/user/profile"}>Profile</NavLink>
                    </li>
                    <li className="px-2 hover:font-semibold">
                      <NavLink to={"/dashboard/user/orders"}>Orders</NavLink>
                    </li>
                  </>
                )}

                <li className="px-2 hover:font-semibold">
                  <NavLink onClick={handleLogOut} to={"/login"}>
                    Logout
                  </NavLink>
                </li>
              </>
            )}
            <li className="h-4 px-2 hover:font-semibold">
              <NavLink className="flex items-center" to={"/cart"}>
                <div className="flex items-center pr-2">
                  <FaCartPlus className="text-xl mr-2" />
                  Cart
                </div>
                {cart.length}
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
