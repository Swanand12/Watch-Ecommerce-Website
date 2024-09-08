import React from "react";

import { useState, useEffect } from "react";
import { useAuth } from "../../../context/authContext";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

const UserRoute = () => {
  const [ok, setOk] = useState(false);
  // eslint-disable-next-line
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      const res = await axios.get("/api/v1/auth/user-auth", {
        headers: {
          Authorization: auth?.token,
        },
      });

      console.log(res);
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) checkAuth();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
};

export default UserRoute;
