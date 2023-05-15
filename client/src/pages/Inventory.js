import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../features/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Inventory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, products } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) navigate("/login");
    dispatch(getProducts());
  }, [dispatch, getProducts, navigate]);

  console.log(products);

  const [search, setSearch] = useState("");
  const filteredProducts = products.filter((category) => {
    if (search === "") {
      return true; // Render all categories when search is empty
    }

    const categoryName = category.productName.toLowerCase();
    const searchInput = search.toLowerCase();

    if (categoryName.startsWith(searchInput)) {
      return true; // Match if category name starts with the search input
    }

    const words = categoryName.split(" ");
    return words.some((word) => word === searchInput); // Match if any word in category name is equal to the search input
  });

  return (
    <div>
      <h1 className="font-mont">Inventory List</h1>
      <div>
        <div className="flex-col">
          <div className="flex items-center justify-between py-2 font-normal text-sm">
            <span>Showing 1 to 1 of 1 Entries</span>
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
              <tr className="flex justify-between items-center text-lg text-center w-full">
                <th className="w-full">#</th>
                <th className="w-full">Product Name</th>
                <th className="w-full">Stock In</th>
                <th className="w-full">Stock Available</th>
              </tr>
              {products &&
                filteredProducts.map((product, index) => {
                  return (
                    <tr
                      key={product._id}
                      className="flex justify-between text-sm font-light text-center"
                    >
                      <td className="w-full items-center justify-center">
                        {index + 1}
                      </td>
                      <td className="w-full">{product.productName}</td>
                      <td className="w-full">{product.stockedIn}</td>
                      <td className="w-full">{product.quantity}</td>
                    </tr>
                  );
                })}
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
