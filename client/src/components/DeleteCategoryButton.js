import React from "react";
import {useDispatch} from "react-redux";
import {deleteCategory} from "../features/userSlice";
import toast from "react-hot-toast";
import {MdDeleteForever} from "react-icons/md";

const DeleteCategoryButton = ({categoryId}) => {
  const dispatch = useDispatch();
  const handleDelete = async () => {
    dispatch(deleteCategory({id: categoryId, toast}));
  };

  return (
    <button
      onClick={handleDelete}
      className="p-2 bg-red-500 text-white rounded hover:bg-red-400"
    >
      <MdDeleteForever />
    </button>
  );
};

export default DeleteCategoryButton;
