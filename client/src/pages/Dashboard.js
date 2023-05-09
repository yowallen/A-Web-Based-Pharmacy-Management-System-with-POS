import React, { useEffect, Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import {
  FaShoppingBag,
  FaChartBar,
  FaBoxes,
  FaArrowCircleRight,
  FaHistory,
} from "react-icons/fa";
import {
  getTodaySalesTotal,
  getSalesCountToday,
  productCount,
  topProducts,
  lowProducts,
} from "../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// const { data, error } = useFetch("http://localhost:8000/proxyData");

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    if (!user) navigate("/login");
    dispatch(getTodaySalesTotal());
    dispatch(getSalesCountToday());
    dispatch(productCount());
    dispatch(topProducts());
    dispatch(lowProducts());
  }, [dispatch, navigate]);

  const { salesToday, salesCountToday, productsCount, user, lowProduct } =
    useSelector((state) => state.user);

  useEffect(() => {
    if (lowProduct.length > 0) {
      openModal();
    } else {
      closeModal();
    }
  }, [dispatch, lowProducts, navigate, lowProduct]);

  const card = "py-3 px-6";

  return (
    <div className="font-pop h-full w-full">
      <h1 className="font-mont">Dashboard</h1>

      <div className="flex justify-around py-3 my-4 text-ter">
        <div className="flex-col w-5/12">
          <div className={`${card} bg-amber-500`}>
            <span>Total Sales</span>
            {/* {data && data.map((data) => <p key={data.id}>{data.totalSales}</p>)}
            {error && <p>{error}</p>} */}
            <p>{salesToday}</p>
            <span className="flex justify-end">
              <FaChartBar style={{ fontSize: "6rem", color: "#b45309" }} />
            </span>
          </div>
          <div className="bg-amber-700 font-normal text-base">
            <Link to="sales">
              <div className="flex items-center justify-center gap-x-2">
                <span>More Info</span>
                <FaArrowCircleRight />
              </div>
            </Link>
          </div>
        </div>

        <div className="flex-col w-5/12">
          <div className={`${card} bg-emerald-600`}>
            <span>Number of Orders</span>
            {/* {data && data.map((data) => <p key={data.id}>{data.numOfSales}</p>)}
            {error && <p>{error}</p>} */}
            <p>{salesCountToday}</p>
            <span className="flex justify-end">
              <FaBoxes style={{ fontSize: "6rem", color: "#065f46" }} />
            </span>
          </div>
          <div className="bg-emerald-800 font-normal text-base">
            <Link to="orders">
              <div className="flex items-center justify-center gap-x-2">
                <span>More Info</span>
                <FaArrowCircleRight />
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex justify-around py-3 my-8 text-ter">
        <div className="flex-col w-5/12">
          <div className={`${card} bg-sky-500`}>
            <span>Total Products</span>
            {/* /* {data && data.map((data) => <p key={data.id}>{data.totalProd}</p>)}
            {error && <p>{error}</p>} */}
            <p>{productsCount}</p>
            <span className="flex justify-end">
              <FaShoppingBag style={{ fontSize: "6rem", color: "#0369a1" }} />
            </span>
          </div>
          <div className="bg-sky-700 font-normal text-base">
            <Link to="inventory">
              <div className="flex items-center justify-center gap-x-2">
                <span>More Info</span>
                <FaArrowCircleRight />
              </div>
            </Link>
          </div>
        </div>

        <div className="flex-col w-5/12">
          <div className={`${card} bg-red-500`}>
            <span>Order History</span>
            <span className="flex justify-end">
              <FaHistory style={{ fontSize: "8.1rem", color: "#991b1b" }} />
            </span>
          </div>
          <div className="bg-red-800 font-normal text-base">
            <Link to="history">
              <div className="flex items-center justify-center gap-x-2">
                <span>More Info</span>
                <FaArrowCircleRight />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                    Product Low in Quantity
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 mb-5">
                      Seems like you have some products that are low in
                      quantity, please check your inventory.
                    </p>
                    <h2 className="font-bold">List</h2>
                    <ul>
                      {lowProduct &&
                        lowProduct.map((product) => (
                          <li>
                            {product.productName} quantity: {product.quantity}
                          </li>
                        ))}
                    </ul>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
