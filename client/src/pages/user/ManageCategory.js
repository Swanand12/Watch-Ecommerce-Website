import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../components/Layout/Layout";
import { Modal } from "antd";
import CreateCategoryForm from "../../components/Layout/Form/createCategoryForm";
import { IoAddCircleOutline } from "react-icons/io5";

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState("");

  // function to handle delete category
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${id}`
      );
      if (data.success) {
        toast.success(data.message);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while deleting category");
    }
  };
  // function to handle update category
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${id}`,
        { name: updateName }
      );

      if (data.success) {
        toast.success(data.message);
        getAllCategories();

        setVisible(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error while Updating category");
      console.log(error);
    }
  };
  // function to handle create category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        name,
      });

      if (data.success) {
        toast.success(data.message);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Somethig went wrong while creating category");
    }
  };
  // function to handle get category
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-all-category");
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
  return (
    <>
      <Layout>
        <div className="flex-col text-center">
          <h1 className="text-2xl text-purple-900 font-semibold m-4">
            Manage Category
          </h1>
          {/* form to create category */}
          <div className="w-1/2 items-center my-10 m-auto flex flex-col ">
            <form
              className="w-[90%] flex-col justify-center items-center flex"
              onSubmit={handleSubmit}
            >
              <div className="mb-4 w-full relative">
                <IoAddCircleOutline className="absolute left-3 text-purple-900 top-2 text-3xl" />
                <input
                  className="p-2 pl-12 font-semibold focus:border-purple-900 focus:outline-none  w-full border-2 shadow-dark-lg border-white placeholder-customblack rounded-lg"
                  type="text"
                  placeholder="Create Category"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>

              <button
                className="bg-purple-900 mt-3 ms-auto px-4 rounded-lg w-[10rem]  text-white p-2.5"
                type="submit"
              >
                Create Category
              </button>
            </form>
          </div>
          {/* for updating  */}
          <Modal
            open={visible}
            onCancel={() => {
              setVisible(false);
            }}
            footer={null}
          >
            <CreateCategoryForm
              handleSubmit={handleUpdate}
              value={updateName}
              setValue={setUpdateName}
            />
          </Modal>
          <div className="w-[100%] flex justify-center">
            <table className="w-[70%] m-4">
              <thead className="">
                <tr>
                  <th className="p-4 w-1/2">Name</th>
                  <th className="p-4 w-1/2">Action</th>
                </tr>
              </thead>

              <tbody className="w-full">
                {/* mapping through all category  */}
                {categories?.map((c) => (
                  <tr key={c._id}>
                    <td key={c._id} className="p-2">
                      {c.name}
                    </td>
                    <td className="p-2">
                      <button
                        onClick={() => {
                          setUpdateName(c.name);
                          setVisible(true);
                          setId(c._id);
                        }}
                        className="bg-[#007BFF] mx-2 px-4 rounded-lg  text-white p-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          handleDelete(c._id);
                        }}
                        className="bg-[#DC3545] mx-2 px-4 rounded-lg  text-white p-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ManageCategory;
