import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getProducts} from "../features/userSlice";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import InventoryTable from "../components/InventoryTable";

export default function Inventory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user, products} = useSelector((state) => state.user);

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
    <InventoryTable
      data={filteredProducts}
      search={search}
      setSearch={setSearch}
    />
  );
}
