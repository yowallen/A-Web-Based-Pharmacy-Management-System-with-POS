import React from "react";
import { useDispatch } from "react-redux";
import { deleteCategory } from "../features/userSlice";
import toast from "react-hot-toast";

const DeleteCategoryButton = ({ categoryId }) => {
  const dispatch = useDispatch();
  const handleDelete = async () => {
    dispatch(deleteCategory({ id: categoryId, toast }));
  };

  return (
    <button
      onClick={handleDelete}
      className="py-1 px-2 bg-red-500 text-white rounded"
    >
      Delete
    </button>
  );
};

export default DeleteCategoryButton;
