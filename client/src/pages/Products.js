import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getCategories, getProducts} from "../features/userSlice";
import UpdateProduct from "../components/UpdateProduct";
import DataTable from "../components/ProductsTable";

export default function Products() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [prodcutToEdit, setProductToEdit] = useState(null);
  const {user, categories, products} = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) navigate("/login");
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch, navigate, user]);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("");

  const filteredProducts = products.filter((product) => {
    if (search !== "") {
      const productName = product.productName.toLowerCase();
      const searchInput = search.toLowerCase();

      if (!productName.startsWith(searchInput)) {
        const words = productName.split(" ");
        if (!words.some((word) => word === searchInput)) {
          return false;
        }
      }
    }

    // Apply dropdown filters
    if (selectedCategory && product.category !== selectedCategory) {
      return false;
    }

    if (selectedType && product.productType !== selectedType) {
      return false;
    }

    if (selectedBrand && product.brand !== selectedBrand) {
      return false;
    }

    if (selectedUnit && product.measurement !== selectedUnit) {
      return false;
    }
    if (selectedSupplier && product.supplier !== selectedSupplier) {
      return false;
    }
    return true; // Include the product if all filters pass
  });

  const [showProductModal, setShowProductModal] = useState(false);
  const handleModal = () => {
    setProductToEdit(products);
    setShowProductModal(true);
  };

  const productOnEdit = (data) => {
    setProductToEdit(data);
  };
  return (
    <div className="max-w-full h-full">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-mont font-bold">Inventory List</h1>
      </div>
      <div className="flex gap-5 font-normal text-xl">
        {/* Dropdown filters */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category._id} value={category.categoryName}>
              {category.categoryName}
            </option>
          ))}
        </select>

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">All Types</option>
          {[...new Set(products.map((product) => product.productType))].map(
            (type) => (
              <option key={type} value={type}>
                {type}
              </option>
            )
          )}
        </select>

        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
        >
          <option value="">All Brands</option>
          {[...new Set(products.map((product) => product.brand))].map(
            (brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            )
          )}
        </select>

        <select
          value={selectedSupplier}
          onChange={(e) => setSelectedSupplier(e.target.value)}
        >
          <option value="">All Supplier</option>
          {[...new Set(products.map((product) => product.supplier))].map(
            (supp) => (
              <option key={supp} value={supp}>
                {supp}
              </option>
            )
          )}
        </select>

        <select
          value={selectedUnit}
          onChange={(e) => setSelectedUnit(e.target.value)}
        >
          <option value="">All Units</option>
          {[...new Set(products.map((product) => product.measurement))].map(
            (unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            )
          )}
        </select>
      </div>

      <DataTable
        data={filteredProducts}
        search={search}
        setSearch={setSearch}
        handleModal={handleModal}
        productOnEdit={productOnEdit}
      />

      {showProductModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-screen">
            <div className="relative my-6 mx-auto basis-1/2">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xl font-semibold">Update Product</h3>
                </div>
                {/*body*/}
                <div className="relative p-3 flex-auto">
                  <UpdateProduct
                    product={prodcutToEdit}
                    categories={categories}
                    user={user.role}
                  />
                  <button
                    className="block mx-auto mt-4 py-2 px-4 bg-gray-500 text-white rounded"
                    onClick={() => setShowProductModal(false)}
                  >
                    Close
                  </button>
                </div>
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </div>
  );
}
