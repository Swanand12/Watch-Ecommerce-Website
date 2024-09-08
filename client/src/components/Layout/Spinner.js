import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ImSpinner9 } from "react-icons/im";

const Spinner = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevMode) => --prevMode);
    }, 1000);

    if (count === 0) {
      navigate("/login", {
        state: location.pathname,
      });
    }
    return () => clearInterval(interval);
  }, [count, navigate, location]);

  return (
    <>
      <div className="flex justify-center h-[100vh]">
        <div className="items-center justify-center flex">
          <span className="animate-spin   ">
            <ImSpinner9 className="text-3xl" />
          </span>
          <h1 className="ml-2 font-semibold text-lg">Loading...</h1>
        </div>
      </div>
    </>
  );
};

export default Spinner;
