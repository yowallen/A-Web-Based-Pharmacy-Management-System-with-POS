import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/userSlice";

export default function Expired() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, products } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) navigate("/login");
    dispatch(getProducts());
  }, [(dispatch, navigate, getProducts)]);

  const [search, setSearch] = useState("");
  const filteredProducts = products.filter((product) => {
    return product.productName.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      <h1 className="font-mont">Batch List</h1>
      <div>
        <div className="flex-col">
          <div className="flex items-center justify-between py-2 font-normal text-sm">
            <span>{`Showing 1 to ${filteredProducts.length} of ${products.length} Entries`}</span>
            <div className="flex gap-x-2 items-center">
              <label>Search:</label>
              <input
                type="text"
                className="w-60 text-xs font-normal p-1 border-2 border-sec border-opacity-50 focus:border-prime focus:outline-none rounded"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="flex h-full">
            <table className="w-full border-2 border-acsent">
              <thead>
                <tr className="flex justify-between items-center text-lg text-center w-full">
                  <th className="w-full">#</th>
                  <th className="w-full">Updated Encoded</th>
                  <th className="w-full">Expiration Date</th>
                  <th className="w-full">Product Info</th>
                  <th className="w-full">Stock</th>
                </tr>
              </thead>
              <tbody>
                {getProducts &&
                  products.length >= 1 &&
                  filteredProducts.map((product, index) => (
                    <tr
                      key={product._id}
                      className="flex justify-between text-sm font-light text-center p-3"
                    >
                      <td className="w-full items-center justify-center">
                        {index + 1}
                      </td>
                      <td className="w-full">
                        {new Date(product.updatedAt).toLocaleString("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </td>
                      <td className="w-full">
                        {new Date(product.expiryDate).toLocaleDateString()}
                      </td>
                      <td className="w-full">
                        <span className="w-full flex">SKU: {product._id}</span>
                        <span className="w-full flex">
                          Product: {product.productName}
                        </span>
                      </td>
                      <td className="w-full">{product.quantity}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center items-center text-base gap-x-1">
            <button className="border-2 py-1 px-2 rounded border-sec hover:bg-acsent">
              Previous
            </button>
            <span className="bg-prime px-2 py-1 rounded text-white">0</span>
            <button className="border-2 py-1 px-2 rounded border-sec hover:bg-acsent">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
