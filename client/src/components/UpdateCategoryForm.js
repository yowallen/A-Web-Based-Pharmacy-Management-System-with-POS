import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { updatecategory } from "../features/userSlice";

const UpdateCategoryForm = ({ category }) => {
  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState(category.categoryName);
  const [categoryDescription, setCategoryDescription] = useState(
    category.categoryDescription
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedCategory = {
      categoryName,
      categoryDescription,
    };
    dispatch(updatecategory({ id: category._id, updatedCategory, toast }));
    setCategoryName("");
    setCategoryDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col  space-y-2 justify-center"
    >
      <label
        htmlFor="categoryName"
        className="font-semibold text-gray-700 text-md"
      >
        Category Name:
      </label>
      <input
        type="text"
        id="categoryName"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        className="border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <label
        htmlFor="categoryDescription"
        className="font-semibold text-gray-700 text-md"
      >
        Category Description:
      </label>
      <textarea
        id="categoryDescription"
        value={categoryDescription}
        onChange={(e) => setCategoryDescription(e.target.value)}
        className="border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      ></textarea>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300 ease-in-out"
      >
        Update Category
      </button>
    </form>
  );
};

export default UpdateCategoryForm;
