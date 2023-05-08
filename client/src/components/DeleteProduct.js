import React from "react";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../features/userSlice";
import { toast } from "react-hot-toast";

const DeleteProduct = ({ productId }) => {
  const dispatch = useDispatch();
  const handleDelete = async () => {
    dispatch(deleteProduct({ id: productId, toast }));
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

export default DeleteProduct;
