import React from "react";
import { useSearch } from "../../../context/searchContext";
import Layout from "../Layout";
import { Link } from "react-router-dom";
import { BiLeftArrowCircle } from "react-icons/bi";

const Search = () => {
  // eslint-disable-next-line
  const [values, setValues] = useSearch();
  return (
    <>
      <Layout>
        <div>
          <div className="flex justify-center w-full items-center">
            <Link to={"/"}>
              <BiLeftArrowCircle className="text-4xl mr-4 text-purple-900 animate-pulse" />
            </Link>
            <h1 className="mb-6 mt-6 text-purple-900 font-semibold text-2xl  text-center">
              Search Results
            </h1>
          </div>
          <div className="flex flex-wrap justify-center m-auto">
            {values.result.length > 0 ? (
              values.result.map((p) => (
                <div
                  key={p._id}
                  className="p-3 m-6 border-2 shadow-dark-lg  border-customblack rounded-2xl w-[15rem] "
                >
                  <div className="flex flex-col items-center  ">
                    <img
                      className="h-[10rem] m-2"
                      src={`/api/v1/product/get-photo/${p._id}`}
                      alt={p.name}
                    />
                    <div className="py-3 flex flex-col  items-center">
                      <h3 className="font-semibold p-1 text-lg">{p.name}</h3>
                      <h2 className="font-semibold p-1 text-xl">₹ {p.price}</h2>
                      <p className="text-sm p-1 text-gray-500 line-clamp-2">
                        {p.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h1 className="text-xl font-semibold">No match found</h1>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Search;
