import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {updateProduct} from "../features/userSlice";
import {toast} from "react-hot-toast";

const UpdateProduct = ({product, categories, user}) => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState({
    productName: product.productName,
    category: product.category,
    productType: product.productType,
    measurement: product.measurement,
    quantity: 0,
    price: product.price,
    expiryDate: product.expiryDate,
    description: product.description,
    brand: product.brand,
    supplier: product.supplier,
    prescriptionRequired: product.prescriptionRequired,
    productLimit: product.productLimit,
    cost: product.cost,
  });

  const {
    productName,
    category,
    productType,
    measurement,
    quantity,
    price,
    expiryDate,
    description,
    prescriptionRequired,
    productLimit,
    cost,
    brand,
    supplier,
  } = productData;

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
      prescriptionRequired: e.target.checked,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        id: product._id,
        productData,
        toast,
      })
    );
  };

  const input =
    "w-full text-sm font-normal p-1 border-2 border-sec border-opacity-50 focus:border-prime focus:outline-none rounded";
  const label = "flex text-base font-mont font-medium pt-2";

  const formattedExpiryDate = expiryDate
    ? new Date(expiryDate).toISOString().slice(0, 10)
    : "";

  return (
    <div>
      {user === "Admin" ? (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col  space-y-2 justify-center text-sm"
        >
          <label
            htmlFor="productName"
            className="font-semibold text-gray-700 text-md"
          >
            Product:
          </label>
          <input
            type="text"
            id="categoryName"
            value={productName}
            onChange={handleChange}
            name="productName"
            className="border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-normal"
          />

          <label
            htmlFor="brand"
            className="font-semibold text-gray-700 text-md"
          >
            Brand:
          </label>
          <input
            type="text"
            id="brand"
            value={brand}
            onChange={handleChange}
            name="brand"
            className="border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-normal"
          />

          <label
            htmlFor="supplier"
            className="font-semibold text-gray-700 text-md"
          >
            Supplier:
          </label>
          <input
            type="text"
            id="supplier"
            value={supplier}
            onChange={handleChange}
            name="supplier"
            className="border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-normal"
          />

          <label
            htmlFor="productType"
            className="font-semibold text-gray-700 text-md"
          >
            Product Type:
          </label>
          {/* <input
            type="text"
            id="productType"
            value={productType}
            onChange={handleChange}
            name="productType"
            className="border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-normal"
          /> */}
          <select
            name="productType"
            id="productType"
            value={productType}
            className={input}
            onChange={handleChange}
          >
            <option value="">--Select Product Type--</option>
            <option value="Capsule">Capsule</option>
            <option value="Drops">Drops</option>
            <option value="Injection">Injection</option>
            <option value="Nebule">Nebule</option>
            <option value="Suspension">Suppositories</option>
            <option value="Syrup">Syrup</option>
            <option value="Tablet">Tablet</option>
          </select>
          <label
            htmlFor="measurement"
            className="font-semibold text-gray-700 text-md"
          >
            Unit:
          </label>
          <input
            type="text"
            id="measurement"
            value={measurement}
            onChange={handleChange}
            name="measurement"
            className="border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-normal"
          />
          <label
            htmlFor="quantity"
            className="font-semibold text-gray-700 text-md"
          >
            quantity:
          </label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={handleChange}
            name="quantity"
            min={0}
            className="border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-normal"
          />
          <label
            htmlFor="quantity"
            className="font-semibold text-gray-700 text-md"
          >
            Minimum Stock Level
          </label>
          <input
            type="number"
            id="productLimit"
            value={productLimit}
            onChange={handleChange}
            name="productLimit"
            className="border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />

          <label htmlFor="cost" className="font-semibold text-gray-700 text-md">
            cost:
          </label>
          <input
            type="number"
            id="cost"
            value={cost}
            onChange={handleChange}
            name="cost"
            className="border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-normal"
          />

          <label
            htmlFor="price"
            className="font-semibold text-gray-700 text-md"
          >
            price:
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={handleChange}
            name="price"
            className="border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-normal"
          />
          <label
            htmlFor="expiryDate"
            className="font-semibold text-gray-700 text-md"
          >
            expiryDate:
          </label>

          <input
            type="date"
            id="expiryDate"
            value={formattedExpiryDate}
            onChange={handleChange}
            name="expiryDate"
            className="border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-normal"
            min={new Date().toISOString().split("T")[0]}
          />

          <div className="flex-col">
            <label className={label}>Product Category:</label>
            <select
              className={input}
              name="category"
              value={category}
              onChange={handleChange}
            >
              <option value="">-- Select category --</option>
              {categories.map((category) => (
                <option key={category._id} value={category.categoryName}>
                  {category.categoryName}
                </option>
              ))}
            </select>
            <div className="flex gap-x-2 pt-3">
              <input
                type="checkbox"
                placeholder="Medicine requires prescription"
                name="prescriptionRequired"
                value={prescriptionRequired}
                onChange={handleChange}
                checked={prescriptionRequired}
              />
              <p className="text-sm font-normal">
                This product requires medical prescription.
              </p>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300 ease-in-out"
          >
            Update Product
          </button>
        </form>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col  space-y-2 justify-center"
        >
          <label
            htmlFor="quantity"
            className="font-semibold text-gray-700 text-md"
          >
            quantity:
          </label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={handleChange}
            name="quantity"
            className="border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />

          <label
            htmlFor="expiryDate"
            className="font-semibold text-gray-700 text-md"
          >
            expiryDate:
          </label>
          <input
            type="date"
            id="expiryDate"
            value={new Date(expiryDate).toISOString().slice(0, 10)}
            onChange={handleChange}
            name="expiryDate"
            className="border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            min={new Date().toISOString().slice(0, 10)}
          />

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300 ease-in-out"
          >
            Update Product
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateProduct;
