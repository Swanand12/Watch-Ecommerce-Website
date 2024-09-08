import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Checkbox, Radio } from "antd";
import { MdOutlineCategory } from "react-icons/md";
import { prices } from "../components/Layout/Prices";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { BsStars } from "react-icons/bs";
import { CgDetailsMore } from "react-icons/cg";
import { MdSearch } from "react-icons/md";
import { FaCartPlus } from "react-icons/fa6";
import { useSearch } from "../context/searchContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { Typewriter } from "react-simple-typewriter";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [values, setValues] = useSearch();
  const [cart, setCart] = useCart();
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();
  const backend_url = process.env.REACT_APP_BACKEND_URL;
  // function to handle navbar shadow on scrolling products
  const handleNavbarScroll = (scrollTop) => {
    const navbar = document.getElementsByClassName("navbar")[0];

    if (navbar) {
      if (scrollTop === 0) navbar.classList.remove("shadow-dark-lg");
      else {
        navbar.classList.add("shadow-dark-lg");
      }
    }
  };

  // function to get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${backend_url}/api/v1/category/get-all-category`
      );
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // getting all categories on initial render
  useEffect(() => {
    getAllCategories();
  }, []);

  // function to get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${backend_url}/api/v1/product/get-products`
      );

      if (data.success) {
        toast.success(data.message);
        setProducts(data.product);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while getting products");
    }
  };

  // getting all products on initial render
  useEffect(() => {
    if (!checked.length && !radio.length) getAllProducts();
    // eslint-disable-next-line
  }, [checked.length, radio.length]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${backend_url}/api/v1/product/search/${values.keyword}`
      );

      if (data.success) {
        setValues({ ...values, result: data?.products });
        navigate("/search");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // function to save categories id in array
  const categoriesFilter = (value, id) => {
    let all = [...checked];

    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const filterProducts = async () => {
    try {
      const { data } = await axios.post(
        `${backend_url}/api/v1/product/product-filter`,
        {
          checked,
          radio,
          page: 1,
        }
      );
      if (data.success) {
        toast.success(data.message);
        setPage(1);
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while filtering products");
    }
  };

  // getting all filter products
  useEffect(() => {
    if (checked.length || radio.length) filterProducts();
    // eslint-disable-next-line
  }, [checked, radio]);

  const getTotal = async () => {
    try {
      const { data } = await axios.post(
        `${backend_url}/api/v1/product/product-count`,
        {
          checked,
          radio,
        }
      );
      if (data?.success) {
        setTotal(data?.total);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (checked.length || radio.length) getTotal();
    // eslint-disable-next-line
  }, [checked, radio]);

  const productList = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${backend_url}/api/v1/product/product-list`,
        {
          checked,
          radio,
          page: page + 1,
        }
      );
      setLoading(false);
      if (data.success) {
        setProducts([...products, ...data.products]);
        setPage(page + 1);
      }
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  };
  const img = "img5.jpg";

  return (
    <Layout>
      <div className="flex flex-col relative ">
        <div className="fixed z-10 top-[90%] left-5">
          <button
            onClick={() => {
              setShowFilter(!showFilter);
            }}
            className="text-4xl p-2 text-white rounded-full bg-purple-900"
            type="button"
          >
            <BsStars className="animate-pulse" />
          </button>
        </div>
        <div className="w-full flex  h-[30rem]">
          <img
            className=" z-0 md:w-[90%] m-[auto] my-10 shadow-dark-lg w-[100%] rounded-lg"
            src={require(`../../public/assets/${img}`)}
            alt="img1.jpg"
          />
        </div>
        <div className="absolute  top-24 font-poppins left-[7rem]">
          <h1 className="text-3xl mb-5 font-bold  text-white">
            <Typewriter
              words={[
                "Timeless Elegance on Your Wrist",
                "Precision Meets Style",
                "Craftsmanship You Can Trust",
              ]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={100}
              deleteSpeed={80}
              delaySpeed={1500}
            />
          </h1>
          <p className="text-lg w-[30%] my-3 text-white ">
            Discover our exclusive collection of luxury watches that combine
            precision, craftsmanship, and style. Elevate every moment with a
            timepiece designed for you.
          </p>
          <button className="px-4 py-2 bg-white text-purple-800 font-black my-3 cursor-pointer rounded-3xl">
            Shop Now
          </button>
          {/* <p className="text-xl my-3 text-white">
           
          </p> */}
        </div>
        <div className="flex ">
          <div
            className={`${
              showFilter
                ? "md:w-[20%] w-[15rem] mt-[4rem] px-[2rem] transform -translate-x-0 duration-500 font-poppins pt-7 shadow-dark-hz h-[100vh] "
                : "w-[0] mt-[4rem] px-[2rem] transform -translate-x-[300%] duration-500 font-poppins pt-7 shadow-dark-hz h-[100vh] "
            }`}
          >
            <h1 className="filter text-2xl font-semibold font-poppins py-4 text-purple-900">
              Filters
            </h1>

            <div className="flex flex-col justify-center ">
              <div className=" pb-2">
                <h1 className="text-lg py-3 flex items-center gap-2 text-customblack">
                  <MdOutlineCategory className="text-xl" />
                  Categories
                </h1>

                {categories?.map((c) => (
                  <Checkbox
                    key={c._id}
                    onChange={(e) => {
                      categoriesFilter(e.target.checked, c._id);
                    }}
                  >
                    {c.name}
                  </Checkbox>
                ))}
              </div>
              <div className=" pb-2">
                <h1 className="text-lg py-3 flex items-center gap-2 text-customblack">
                  <RiMoneyRupeeCircleLine className="text-xl" />
                  Prices
                </h1>

                <Radio.Group
                  onChange={(e) => {
                    setRadio(e.target.value);
                  }}
                >
                  {prices?.map((p) => (
                    <div key={p._id}>
                      <Radio value={p.array}>{p.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
            </div>
          </div>

          <div
            className="flex flex-col w-[100%] overflow-y-auto h-screen mt-10"
            onScroll={(e) => handleNavbarScroll(e.target.scrollTop)}
          >
            <h1 className="my-5 text-purple-900 font-semibold text-3xl text-center">
              Our Products
            </h1>
            <div className="w-[80%] md:w-[60%] flex m-auto text-center py-4 ">
              <form className="w-[100%]" onSubmit={handleSearch}>
                <div className="my-7 w-full relative">
                  <MdSearch className="absolute left-3 text-purple-900 top-2 text-3xl" />
                  <input
                    type="search"
                    placeholder="Search Product"
                    value={values.keyword}
                    onChange={(e) => {
                      setValues({ ...values, keyword: e.target.value });
                    }}
                    className="py-2 pl-12 pr-15 font-semibold focus:border-purple-900 focus:outline-none  w-full border-2 shadow-dark-lg border-white placeholder-customblack rounded-lg"
                  />
                  <button
                    type="submit"
                    className="absolute  right-0 bg-purple-900 text-lg text-white py-2 px-3 rounded-lg "
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>

            <div className="flex flex-wrap justify-center m-auto ">
              {products.map((p) => (
                <div
                  key={p._id}
                  className="p-3 m-6 rounded-lg hover:scale-110 transition-transform duration-300 cursor-pointer shadow-dark-hz  w-[15rem] "
                >
                  <div className="flex flex-col items-center  ">
                    <img
                      className="h-[10rem] m-2"
                      src={`${backend_url}/api/v1/product/get-photo/${p._id}`}
                      alt={p.name}
                    />
                    <div className="py-1 flex flex-col  items-center">
                      <h3 className="font-semibold p-1 text-lg ">{p.name}</h3>
                      <h2 className="font-semibold p-1 text-xl">₹ {p.price}</h2>
                      <p className="text-sm p-1 text-gray-500  ">
                        {p.description.substring(0, 50)}...
                      </p>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => {
                          setCart([...cart, p]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, p])
                          );
                          toast.success("Item added to cart");
                        }}
                        className="bg-purple-900 flex items-center justify-center text-sm text-white font-semibold p-2 my-3 rounded-lg w-[10rem]"
                      >
                        <FaCartPlus className="text-xl mr-2" />
                        ADD TO CART
                      </button>
                      <button
                        onClick={() => {
                          navigate(`/single-product/${p.slug}`);
                        }}
                        type="button"
                        className="bg-purple-900 flex items-center justify-center text-sm text-white font-semibold p-2 my-3 rounded-lg w-[10rem]"
                      >
                        <CgDetailsMore className="text-xl mr-2" />
                        MORE DETAILS
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className=" text-center">
              {products && products.length < total && (
                <button
                  className="bg-purple-800 text-white  p-2 my-3 font-semibold rounded-lg w-[8rem]"
                  onClick={productList}
                >
                  {loading ? "Loading..." : "Load More"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
