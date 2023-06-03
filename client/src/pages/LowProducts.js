import { lowProducts } from "../features/userSlice";
import LowProductsTable from "../components/LowProductsTable";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";

const LowProducts = () => {
  const componentRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, lowProduct } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) navigate("/login");
    dispatch(lowProducts());
  }, [dispatch, lowProducts, navigate]);

  const [search, setSearch] = useState("");
  const filteredProducts = lowProduct.filter((category) => {
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
    <>
      <LowProductsTable
        data={filteredProducts}
        search={search}
        setSearch={setSearch}
      />
    </>
  );
};

export default LowProducts;
