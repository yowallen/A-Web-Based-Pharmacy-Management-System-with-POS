import { useEffect, useState, Fragment } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, createSales } from "../features/userSlice";
import { toast } from "react-hot-toast";
import Reciept from "../components/Reciept";
import { Dialog, Transition } from "@headlessui/react";

export default function PointOfSale() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [displayProducts, setDisplayProducts] = useState([]); // state to hold products to display in table
  const [selectedProducts, setSelectedProducts] = useState();
  const [payProducts, setPayProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [newQuantity, setNewQuantity] = useState();

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    if (!user) navigate("/login");
    dispatch(getProducts());
  }, [dispatch, navigate]);

  const { products, user, receipt } = useSelector((state) => state.user);

  const options = products.map((product) => ({
    value: {
      id: product._id,
      product: product.productName,
      price: product.price,
      quantity: product.quantity,
    },
    label: `${product.productName}: stock(${product.quantity})`,
  }));

  const handleAddProduct = (event) => {
    event.preventDefault();

    if (!selectedProducts) return toast.error("Please select a product");

    const { value } = selectedProducts;
    const { value: quantityValue } = event.target.quantity;

    if (value.quantity < quantityValue) {
      return toast.error(
        `Product quantity is ${value.quantity} and you are trying to sell ${quantityValue}`
      );
    } else if (quantityValue > 0) {
      const existingProductIndex = displayProducts.findIndex(
        (product) => product.id === value.id
      );

      if (existingProductIndex !== -1) {
        const existingQuantity = displayProducts[existingProductIndex].quantity;

        // Check if the sum exceeds the available stock
        if (existingQuantity + parseInt(quantityValue) > value.quantity) {
          return toast.error(
            `The total quantity exceeds the available stock of ${value.quantity}`
          );
        }

        // Update the quantity of the existing product
        const updatedProducts = [...displayProducts];
        updatedProducts[existingProductIndex].quantity +=
          parseInt(quantityValue);

        setDisplayProducts(updatedProducts);
      } else {
        // Add a new product to displayProducts
        const newProduct = {
          id: value.id,
          product: value.product,
          price: value.price,
          quantity: parseInt(quantityValue),
        };

        setDisplayProducts([...displayProducts, newProduct]);
      }

      const existingPayProductIndex = payProducts.findIndex(
        (product) => product.productId === value.id
      );

      if (existingPayProductIndex !== -1) {
        const existingPayQuantity =
          payProducts[existingPayProductIndex].quantity;

        // Check if the sum exceeds the available stock
        if (existingPayQuantity + parseInt(quantityValue) > value.quantity) {
          return toast.error(
            `The total quantity exceeds the available stock of ${value.quantity}`
          );
        }

        // Update the quantity of the existing payProduct
        const updatedPayProducts = [...payProducts];
        updatedPayProducts[existingPayProductIndex].quantity +=
          parseInt(quantityValue);

        setPayProducts(updatedPayProducts);
      } else {
        // Add a new product to payProducts
        setPayProducts([
          ...payProducts,
          { productId: value.id, quantity: parseInt(quantityValue) },
        ]);
      }

      const newTotal = total + value.price * quantityValue;
      setTotal(newTotal);
    } else {
      toast.error("Quantity must be greater than 0");
    }

    setSelectedProducts(null);
    event.target.quantity.value = "";
  };

  const handleProductChange = (selectedOption) => {
    setSelectedProducts(selectedOption);
  };
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  const handlePay = () => {
    dispatch(createSales({ payProducts, toast }));
    setShowReceiptModal(true);
    setDisplayProducts([]);
    setPayProducts([]);
    dispatch(getProducts());
  };

  // Function to close the receipt modal
  const handleCloseReceiptModal = () => {
    setShowReceiptModal(false);
  };

  const handleEditQuantity = (productId) => {
    // Find the product in the displayProducts array with the matching productId
    const updatedProducts = displayProducts.map((product) => {
      if (product.id === productId) {
        const parsedQuantity = parseInt(newQuantity);
        if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
          return product;
        }

        return {
          ...product,
          quantity: parsedQuantity,
        };
      }
      return product;
    });
    toast.success("product Updated");
    setDisplayProducts(updatedProducts);
  };

  return (
    <div className="w-full">
      <h1 className="font-mont">Sales</h1>
      <div className="py-8">
        <form onSubmit={handleAddProduct}>
          <div className="flex items-center justify-between w-full text-lg">
            <div className="flex-col w-4/12">
              <label>Product</label>
              <Select
                name="product"
                className="w-80 text-base font-normal"
                options={options}
                value={selectedProducts}
                onChange={handleProductChange}
                isSearchable={true}
              />
            </div>

            <div className="flex-col w-4/12">
              <label>Qty</label>
              <input
                name="quantity"
                className="w-full text-sm font-normal p-2 border-2 border-sec border-opacity-50 focus:border-prime focus:outline-none rounded"
                type="number"
              />
            </div>
            <button
              type="submit"
              className="mt-7 text-base font-medium border-2 bg-sky-500 py-2 px-6 rounded-lg text-white hover:bg-sky-700"
            >
              + Add to List
            </button>
          </div>
        </form>
      </div>

      <div>
        <div className="flex-col">
          <div className="flex h-full">
            <table className="w-full border-2 border-acsent">
              <thead>
                <tr className="flex justify-between items-center text-lg text-center w-full">
                  <th className="w-full">Product</th>
                  <th className="w-full">Qty</th>
                  <th className="w-full">Price</th>
                  <th className="w-full">Amount</th>
                  <th className="w-full">Edit Quantity</th>{" "}
                </tr>
              </thead>
              <tbody>
                {displayProducts.map((product) => (
                  <>
                    <tr
                      key={product.id}
                      className="flex justify-between text-sm font-light text-center"
                    >
                      <td className="w-full">{product.product}</td>
                      <td className="w-full">{product.quantity}</td>
                      <td className="w-full">{product.price}</td>
                      <td className="w-full">
                        {product.price * product.quantity}
                      </td>
                      <td className="w-full">
                        <button
                          onClick={openModal}
                          className="text-blue-500 hover:underline"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                    <Transition appear show={isOpen} as={Fragment}>
                      <Dialog
                        as="div"
                        className="relative z-10"
                        onClose={closeModal}
                      >
                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0"
                          enterTo="opacity-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                          <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                              as={Fragment}
                              enter="ease-out duration-300"
                              enterFrom="opacity-0 scale-95"
                              enterTo="opacity-100 scale-100"
                              leave="ease-in duration-200"
                              leaveFrom="opacity-100 scale-100"
                              leaveTo="opacity-0 scale-95"
                            >
                              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                  as="h3"
                                  className="text-lg font-medium leading-6 text-gray-900"
                                >
                                  Update Quantity
                                </Dialog.Title>
                                <div className="mt-2">
                                  <input
                                    type="number"
                                    value={newQuantity}
                                    onChange={(e) =>
                                      setNewQuantity(e.target.value)
                                    }
                                  />
                                </div>

                                <div className="mt-4">
                                  <button
                                    type="button"
                                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    onClick={() =>
                                      handleEditQuantity(product.id)
                                    }
                                  >
                                    Update
                                  </button>
                                  <button
                                    type="button"
                                    className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    onClick={() => closeModal()}
                                  >
                                    Close
                                  </button>
                                </div>
                              </Dialog.Panel>
                            </Transition.Child>
                          </div>
                        </div>
                      </Dialog>
                    </Transition>
                  </>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center items-center text-base gap-x-1">
            <span className="bg-prime px-2 py-1 rounded text-white">
              Total:
              {displayProducts.reduce(
                (total, product) => total + product.price * product.quantity,
                0
              )}
            </span>
            <button
              onClick={handlePay}
              className="border-2 py-1 px-2 rounded border-sec hover:bg-acsent"
            >
              Pay
            </button>
          </div>
        </div>
      </div>
      {showReceiptModal && (
        <Reciept sale={receipt} closeModal={handleCloseReceiptModal} />
      )}
    </div>
  );
}
