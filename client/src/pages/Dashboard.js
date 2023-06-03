import React, { useEffect, Fragment, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaShoppingBag,
  FaChartBar,
  FaBoxes,
  FaArrowCircleRight,
  FaHistory,
} from "react-icons/fa";
import { TbCurrencyPeso } from "react-icons/tb";
import {
  getTodaySalesTotal,
  getSalesCountToday,
  productCount,
  topProducts,
  lowProducts,
  getAlmostExpired,
  getProducts,
} from "../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Products from "./Products";

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

  let [expireisOpen, setexpireIsOpen] = useState(false);

  function expirecloseModal() {
    setexpireIsOpen(false);
  }

  function expireopenModal() {
    setexpireIsOpen(true);
  }

  useEffect(() => {
    if (!user) navigate("/login");
    dispatch(getTodaySalesTotal());
    dispatch(getSalesCountToday());
    dispatch(productCount());
    dispatch(topProducts());
    dispatch(lowProducts());
    dispatch(getAlmostExpired());
    dispatch(getProducts());
  }, [dispatch, navigate]);

  const {
    salesToday,
    salesCountToday,
    productsCount,
    user,
    lowProduct,
    almostExpired,
    products,
  } = useSelector((state) => state.user);

  useEffect(() => {
    if (lowProduct.length > 0) {
      openModal();
    } else {
      closeModal();
    }
  }, [dispatch, lowProducts, products, navigate, lowProduct]);

  useEffect(() => {
    if (almostExpired.length > 0) {
      expireopenModal();
    } else {
      expirecloseModal();
    }
  }, [dispatch, almostExpired, navigate, getAlmostExpired]);

  const [showNotificationText, setShowNotificationText] = useState(false);
  const [showExNotificationText, setExShowNotificationText] = useState(false);

  // Function to handle notification click
  const handleNotificationClick = () => {
    setShowNotificationText(!showNotificationText);
  };

  const handleExNotificationClick = () => {
    setExShowNotificationText(!showExNotificationText);
  };

  const card = "py-3 px-6";

  return (
    <div className="font-pop h-full w-full">
      <h1 className="font-mont">Dashboard</h1>

      <div className="flex justify-between py-3 my-4 text-ter">
        <div className="flex-col w-5/12">
          <div className={`${card} bg-amber-500`}>
            <span>Total Sales</span>
            {/* {data && data.map((data) => <p key={data.id}>{data.totalSales}</p>)}
      {error && <p>{error}</p>} */}
            <p className="flex items-center">
              <TbCurrencyPeso />
              {salesToday}
            </p>
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

      <div className="flex justify-between py-3 my-8 text-ter">
        <div className="flex-col w-5/12">
          <div className={`${card} bg-sky-500`}>
            <span>Total Products</span>
            {/* /* {data && data.map((data) => <p key={data.id}>{data.totalProd}</p>)}
            {error && <p>{error}</p>} */}
            <p>{productsCount}</p>
            {isOpen && (
              <div
                style={{
                  position: "fixed",
                  bottom: "80px",
                  right: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "40px",
                  height: "40px",
                  backgroundColor: "red",
                  borderRadius: "50%",
                  color: "white",
                  fontSize: "12px",
                  fontWeight: "bold",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                  cursor: "pointer",
                  zIndex: "999",
                }}
                onClick={handleNotificationClick}
              >
                {lowProduct.length}
              </div>
            )}

            {expireisOpen && (
              <div
                style={{
                  position: "fixed",
                  bottom: "150px",
                  right: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "40px",
                  height: "40px",
                  backgroundColor: "red",
                  borderRadius: "50%",
                  color: "white",
                  fontSize: "12px",
                  fontWeight: "bold",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                  cursor: "pointer",
                  zIndex: "999",
                }}
                onClick={handleExNotificationClick}
              >
                {almostExpired.length}
              </div>
            )}
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

      <div className="flex justify-between py-3 my-8 text-ter">
        <div className="flex-col w-5/12">
          <div className={`${card} bg-emerald-600`}>
            <span>Updated Products</span>
            {/* {data && data.map((data) => <p key={data.id}>{data.numOfSales}</p>)}
      {error && <p>{error}</p>} */}
            <p>
              {products.length &&
                `${products[0].productName} (${products[0].quantity})`}
            </p>
            <span className="flex justify-end">
              <FaBoxes style={{ fontSize: "6rem", color: "#065f46" }} />
            </span>
          </div>
          <div className="bg-emerald-800 font-normal text-base">
            <Link to="/new">
              <div className="flex items-center justify-center gap-x-2">
                <span>More Info</span>
                <FaArrowCircleRight />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {showNotificationText && (
        <div
          style={{
            position: "fixed",
            bottom: "80px",
            right: "70px",
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
            cursor: "pointer",
            zIndex: "999",
          }}
          onClick={() => navigate("/low")}
        >
          <p
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              marginBottom: "5px",
            }}
          >
            You have {lowProduct.length} low product(s).
          </p>
          <p style={{ fontSize: "12px", color: "#666" }}>
            Click here to view more details.
          </p>
        </div>
      )}

      {showExNotificationText && (
        <div
          style={{
            position: "fixed",
            bottom: "80px",
            right: "70px",
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
            cursor: "pointer",
            zIndex: "999",
          }}
          onClick={() => navigate("/products")}
        >
          <p
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              marginBottom: "5px",
            }}
          >
            You have {almostExpired.length} almost expired product(s).
          </p>
          <p style={{ fontSize: "12px", color: "#666" }}>
            Click here to view more details.
          </p>
        </div>
      )}
    </div>
  );
}
