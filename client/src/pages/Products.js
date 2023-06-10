import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {toast} from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {addProduct, getCategories, getProducts} from "../features/userSlice";
import UpdateProduct from "../components/UpdateProduct";
import DataTable from "../components/ProductsTable";
import {TbBrandAmd} from "react-icons/tb";

export default function Products() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [prodcutToEdit, setProductToEdit] = useState(null);
  const [productData, setProductData] = useState({
    productName: "",
    category: "",
    productType: "",
    measurement: 0,
    price: 0,
    description: "",
    expiryDate: "",
    prescriptionRequired: false,
    quantity: 0,
    productLimit: 0,
    cost: 0,
    brand: "",
    supplier: "",
  });

  const {
    productName,
    category,
    productType,
    measurement,
    price,
    description,
    expiryDate,
    prescriptionRequired,
    quantity,
    productLimit,
    cost,
    brand,
    supplier,
  } = productData;

  useEffect(() => {
    if (!user) navigate("/login");
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch, addProduct, getCategories, onsubmit]);

  const {user, categories, products} = useSelector((state) => state.user);

  const onChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
      prescriptionRequired: e.target.checked,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (parseInt(quantity, 10) < parseInt(productLimit, 10)) {
      toast.error(
        "Quantity must be greater than 0 or greater than product limit"
      );
      return;
    }
    dispatch(addProduct({productData, toast}));
    setShowModal(false);
    setProductData({
      productName: "",
      category: "",
      productType: "",
      measurement: 0,
      price: 0,
      description: "",
      expiryDate: "",
      prescriptionRequired: false,
      quantity: 0,
      productLimit: 0,
      cost: 0,
      brand: "",
      supplier: "",
    });
    dispatch(getCategories());
    dispatch(getProducts());
  };

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

  const label = "flex text-base font-mont font-medium pt-2";
  const input =
    "w-full text-sm font-normal p-1 border-2 border-sec border-opacity-50 focus:border-prime focus:outline-none rounded";

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
      <div className="flex items-center justify-between">
        <h1 className="font-mont font-bold">Product List</h1>
        <button
          className="bg-emerald-500 text-white hover:bg-emerald-400 font-bold uppercase text-sm px-6 py-3 rounded"
          type="button"
          onClick={() => setShowModal(true)}
        >
          + Add Product
        </button>
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
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-screen">
            <div className="relative my-6 mx-auto basis-1/2">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xl font-semibold">Adding New Product</h3>
                </div>
                {/*body*/}
                <div className="relative p-3 flex-auto">
                  <form onSubmit={onSubmit}>
                    <div className="flex-col">
                      <label className={label}>Product Name:</label>
                      <input
                        type="text"
                        className={input}
                        placeholder="Enter name of product"
                        name="productName"
                        value={productName}
                        onChange={(e) => onChange(e)}
                      />
                    </div>

                    <div className="flex-col">
                      <label className={label}>Brand:</label>
                      <input
                        type="text"
                        className={input}
                        placeholder="Enter name of brand"
                        name="brand"
                        value={brand}
                        onChange={(e) => onChange(e)}
                      />
                    </div>

                    <div className="flex-col">
                      <label className={label}>Supplier:</label>
                      <input
                        type="text"
                        className={input}
                        placeholder="Enter name of supplier"
                        name="supplier"
                        value={supplier}
                        onChange={(e) => onChange(e)}
                      />
                    </div>

                    <div className="flex-col">
                      <label className={label}>Product Category:</label>
                      <select
                        className={input}
                        name="category"
                        value={category}
                        onChange={(e) => onChange(e)}
                      >
                        <option value="">-- Select category --</option>
                        {categories.map((category) => (
                          <option
                            key={category._id}
                            value={category.categoryName}
                          >
                            {category.categoryName}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex-col">
                      <label className={label}>Product Type:</label>

                      <select
                        name="productType"
                        id=""
                        value={productType}
                        className={input}
                        onChange={(e) => onChange(e)}
                      >
                        <option value="">--Select Product Type--</option>
                        <option value="Capsule">Capsule</option>
                        <option value="Drops">Drops</option>
                        <option value="Injection">Injection</option>
                        <option value="Nebule">Nebule</option>
                        <option value="Suspension">Suspension</option>
                        <option value="Syrup">Syrup</option>
                        <option value="Tablet">Tablet</option>
                      </select>
                    </div>

                    <div className="flex-col">
                      <label className={label}>Unit:</label>
                      <input
                        type="text"
                        className={input}
                        placeholder="Enter product measurement"
                        name="measurement"
                        value={measurement}
                        onChange={(e) => onChange(e)}
                      />
                    </div>

                    <div className="flex-col">
                      <label className={`${label} gap-x-2`}>
                        Quantity:
                        {quantity === 0 && (
                          <p className="text-red-900 text-[15px]">
                            must be greater than 0 and/or product limit.
                          </p>
                        )}
                      </label>
                      <input
                        type="number"
                        className={input}
                        placeholder="Enter product quantity"
                        name="quantity"
                        value={quantity}
                        onChange={(e) => onChange(e)}
                        min={0}
                      />
                    </div>

                    <div className="flex-col">
                      <label className={label}>Minimum Stock Level:</label>
                      <input
                        type="number"
                        className={input}
                        placeholder="Enter product quantity"
                        name="productLimit"
                        value={productLimit}
                        onChange={(e) => onChange(e)}
                        min={0}
                      />
                    </div>

                    <div className="flex-col">
                      <label className={label}>Cost</label>
                      <input
                        type="number"
                        className={input}
                        placeholder="Enter suggested price"
                        name="cost"
                        value={cost}
                        onChange={(e) => onChange(e)}
                      />
                    </div>

                    <div className="flex-col">
                      <label className={label}>Price</label>
                      <input
                        type="number"
                        className={input}
                        placeholder="Enter suggested price"
                        name="price"
                        value={price}
                        onChange={(e) => onChange(e)}
                      />
                    </div>

                    <div className="flex-col">
                      <label className={label}>Expiry Date:</label>
                      <input
                        type="date"
                        className={input}
                        placeholder="Enter the expiration date"
                        name="expiryDate"
                        value={expiryDate}
                        onChange={(e) => onChange(e)}
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>

                    <div className="flex gap-x-2 pt-3">
                      <input
                        type="checkbox"
                        placeholder="Medicine requires prescription"
                        name="prescriptionRequired"
                        value={prescriptionRequired}
                        onChange={(e) => onChange(e)}
                      />
                      <p className="text-sm font-normal">
                        This product requires medical prescription.
                      </p>
                    </div>
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Add Product
                      </button>
                    </div>
                  </form>
                </div>
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

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
