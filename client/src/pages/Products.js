import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { addProduct, getCategories, getProducts } from "../features/userSlice";
import UpdateProduct from "../components/UpdateProduct";

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
  } = productData;

  useEffect(() => {
    if (!user) navigate("/login");
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch, addProduct, getCategories]);

  const { user, categories, products } = useSelector((state) => state.user);

  const onChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
      prescriptionRequired: e.target.checked,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (quantity === 0 || quantity < productLimit) {
      toast.error(
        "Quantity must be greater than 0 or greater than product limit"
      );
      return;
    }
    dispatch(addProduct({ productData, toast }));
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
    });
    dispatch(getCategories());
  };

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

  const label = "flex text-base font-mont font-medium pt-2";
  const input =
    "w-full text-sm font-normal p-1 border-2 border-sec border-opacity-50 focus:border-prime focus:outline-none rounded";

  const [showProductModal, setShowProductModal] = useState(false);
  return (
    <div className="w-full h-full">
      <h1 className="font-mont">Products</h1>
      <button
        className="bg-emerald-500 text-white hover:bg-emerald-400 font-bold uppercase text-sm px-6 py-3 rounded"
        type="button"
        onClick={() => setShowModal(true)}
      >
        + Add Product
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-screen">
            <div className="relative w-auto my-6 mx-auto w-96">
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
                      <input
                        type="text"
                        className={input}
                        placeholder="Enter type of product"
                        name="productType"
                        value={productType}
                        onChange={(e) => onChange(e)}
                      />
                    </div>

                    <div className="flex-col">
                      <label className={label}>Measurement:</label>
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
                      <label className={label}>Quantity:</label>
                      <input
                        type="number"
                        className={input}
                        placeholder="Enter product quantity"
                        name="quantity"
                        value={quantity}
                        onChange={(e) => onChange(e)}
                      />
                      {quantity === 0 && (
                        <p className="text-red-900 text-[15px]">
                          must be greater than 0 or greater that product limit
                        </p>
                      )}
                    </div>

                    <div className="flex-col">
                      <label className={label}>Product Limit:</label>
                      <input
                        type="number"
                        className={input}
                        placeholder="Enter product quantity"
                        name="productLimit"
                        value={productLimit}
                        onChange={(e) => onChange(e)}
                      />
                    </div>

                    <div className="flex-col">
                      <label className={label}>Description</label>
                      <textarea
                        id=""
                        rows="5"
                        className={input}
                        placeholder="Enter description"
                        style={{ resize: "none" }}
                        name="description"
                        value={description}
                        onChange={(e) => onChange(e)}
                      ></textarea>
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

      <div>
        <h2 className="text-xl mt-6">Manage Products</h2>
        <div className="flex-col">
          <div className="flex items-center justify-between py-2 font-normal text-sm">
            <span>{`Showing 1 to ${filteredProducts.length} of ${products.length} Entries`}</span>
            <div className="flex gap-x-2 items-center">
              <label>Search:</label>
              <input
                type="text"
                className="w-60 text-xs font-normal p-1 border-2 border-sec border-opacity-50 focus:border-prime focus:outline-none rounded"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
          </div>

          <div className="flex h-full">
            <table className="w-full border-2 border-acsent">
              <thead>
                <tr className="flex justify-between items-center text-lg text-center w-full">
                  <th className="w-full">#</th>
                  <th className="w-full">Product Info</th>
                  <th className="w-full">Type</th>
                  <th className="w-full">Qty</th>
                  <th className="w-full">Price</th>
                  <th className="w-full">Action</th>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.length >= 1 &&
                  filteredProducts.map((product, index) => (
                    <tr
                      key={product._id}
                      className={`flex justify-between text-sm font-light text-center m-2 ${
                        product.quantity <= product.productLimit
                          ? "bg-yellow-200"
                          : ""
                      }`}
                    >
                      <td className="w-full flex items-center justify-center">
                        {index + 1}
                      </td>
                      <td className="w-full flex-col">
                        <span className="w-full flex">SKU:</span>
                        <span className="w-full flex">
                          Category: {product.category}
                        </span>
                        <span className="w-full flex">
                          Name: {product.productName}
                        </span>
                        <span className="w-full flex">
                          Description: {product.description}
                        </span>
                      </td>
                      <td className="w-full">{product.productType}</td>
                      <td className="w-full">{product.quantity}</td>
                      <td className="w-full">{product.price}</td>
                      <td className="w-full">
                        <button
                          onClick={() => {
                            setProductToEdit(product);
                            setShowProductModal(true);
                          }}
                          className="py-1 px-2 bg-emerald-500 text-white rounded"
                        >
                          update
                        </button>
                        {/* <DeleteProduct productId={product._id} /> */}
                      </td>
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
        {showProductModal && (
          <div className="mx-auto z-50 w-1/2 bg-white rounded-lg shadow-lg p-4">
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
        )}
      </div>
    </div>
  );
}
