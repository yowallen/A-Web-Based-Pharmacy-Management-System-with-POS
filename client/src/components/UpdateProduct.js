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
    prescriptionRequired: product.prescriptionRequired,
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

  return (
    <div>
      {user === "Admin" ? (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col  space-y-2 justify-center"
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
            className="border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />

          <label
            htmlFor="productType"
            className="font-semibold text-gray-700 text-md"
          >
            productType:
          </label>
          <input
            type="text"
            id="productType"
            value={productType}
            onChange={handleChange}
            name="productType"
            className="border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label
            htmlFor="measurement"
            className="font-semibold text-gray-700 text-md"
          >
            measurement:
          </label>
          <input
            type="text"
            id="measurement"
            value={measurement}
            onChange={handleChange}
            name="measurement"
            className="border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            className="border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            className="border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label
            htmlFor="description"
            className="font-semibold text-gray-700 text-md"
          >
            description:
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={handleChange}
            name="description"
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
