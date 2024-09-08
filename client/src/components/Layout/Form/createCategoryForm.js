import React from "react";
import { MdOutlineEdit } from "react-icons/md";

const createCategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form
        className="w-[90%] flex flex-col justify-center items-center flex"
        onSubmit={handleSubmit}
      >
        <div className="mb-4 w-full relative">
          <MdOutlineEdit className="absolute left-3 text-purple-900 top-2 text-2xl" />
          <input
            className="p-2 pl-10 font-semibold focus:border-purple-900 focus:outline-none  w-full border-2 shadow-dark-lg border-white placeholder-customblack rounded-lg"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          ></input>
        </div>
        <button
          className="p-3  ms-auto w-[10rem] shadow-dark-lg hover:font-semibold bg-purple-900 text-white rounded-lg"
          type="submit"
        >
          Update Category
        </button>
      </form>
    </>
  );
};

export default createCategoryForm;
