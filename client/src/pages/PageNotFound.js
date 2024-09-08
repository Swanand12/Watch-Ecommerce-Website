import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";

const PageNotFound = () => {
  return (
    <Layout>
      <div className="flex justify-center items-center h-[80vh] ">
        <div className="flex-col text-center text-customblack ">
          <h1 className="text-8xl font-poppins ">404</h1>
          <h2 className="py-[1rem] text-2xl font-bold">Oops! Page Not Found</h2>
          <button className="border-4 font-bold hover:text-secondary py-2 px-4 border-customblack">
            <Link to={"/"}>Go back</Link>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default PageNotFound;
