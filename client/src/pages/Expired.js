import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getProducts} from "../features/userSlice";
import BatchTable from "../components/BatchTable";

export default function Expired() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user, products} = useSelector((state) => state.user);

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
      <BatchTable
        data={filteredProducts}
        search={search}
        setSearch={setSearch}
      />
    </div>
  );
}
