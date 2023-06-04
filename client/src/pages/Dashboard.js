import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {
  FaShoppingBag,
  FaChartBar,
  FaBoxes,
  FaArrowCircleRight,
  FaHistory,
} from "react-icons/fa";
import {TbCurrencyPeso} from "react-icons/tb";
import {RiAlarmWarningLine} from "react-icons/ri";
import {IoWarningOutline} from "react-icons/io5";
import {HiTemplate} from "react-icons/hi";
import {
  getTodaySalesTotal,
  getSalesCountToday,
  productCount,
  topProducts,
  lowProducts,
  getAlmostExpired,
  getProducts,
} from "../features/userSlice";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    salesToday,
    salesCountToday,
    productsCount,
    user,
    lowProduct,
    almostExpired,
    products,
  } = useSelector((state) => state.user);

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
  }, [dispatch, navigate, user]);

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

  const [showNotificationText, setShowNotificationText] = useState(true);
  const [showExNotificationText, setExShowNotificationText] = useState(true);

  // Function to handle notification click
  const handleNotificationClick = () => {
    setShowNotificationText(!showNotificationText);
  };

  const handleExNotificationClick = () => {
    setExShowNotificationText(!showExNotificationText);
  };

  const card = "py-3 px-6";

  return (
    <div className="font-pop h-full w-full overflow-y-hidden">
      <h1 className="font-mont">Dashboard</h1>

      <div className="flex justify-between pt-3 my-4 text-ter">
        <div className="flex-col w-5/12">
          <div className={`${card} bg-amber-500`}>
            <span>Total Earnings Today</span>
            {/* {data && data.map((data) => <p key={data.id}>{data.totalSales}</p>)}
      {error && <p>{error}</p>} */}
            <p className="flex items-center">
              <TbCurrencyPeso />
              {salesToday}
            </p>
            <span className="flex justify-end">
              <FaChartBar style={{fontSize: "6rem", color: "#b45309"}} />
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
            <span>Todays Total Order</span>
            {/* {data && data.map((data) => <p key={data.id}>{data.numOfSales}</p>)}
      {error && <p>{error}</p>} */}
            <p className="flex items-center gap-x-2">
              {salesCountToday}{" "}
              <p className="text-base">products has been sold</p>
            </p>
            <span className="flex justify-end">
              <FaBoxes style={{fontSize: "6rem", color: "#065f46"}} />
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

      <div className="flex justify-between pt-3 my-8 text-ter">
        <div className="flex-col w-5/12">
          <div className={`${card} bg-sky-500`}>
            <span>Total Products</span>
            {/* /* {data && data.map((data) => <p key={data.id}>{data.totalProd}</p>)}
            {error && <p>{error}</p>} */}
            <p className="flex items-center gap-x-2">
              {productsCount} <p className="text-base">products</p>
            </p>
            {isOpen && (
              <>
                <div
                  style={{
                    position: "fixed",
                    bottom: "200px",
                    right: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "35px",
                    height: "35px",
                    backgroundColor: "red",
                    borderRadius: "50%",
                    color: "white",
                    fontSize: "12px",
                    fontWeight: "bold",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                    cursor: "pointer",
                    zIndex: "999",
                  }}
                >
                  {lowProduct.length}
                </div>
                <div
                  onClick={handleNotificationClick}
                  className="fixed cursor-pointer p-4 text-3xl bg-prime rounded-full bottom-[165px] right-8 hover:bg-sec"
                >
                  <IoWarningOutline />
                </div>
              </>
            )}

            {expireisOpen && (
              <>
                <div
                  style={{
                    position: "fixed",
                    bottom: "110px",
                    right: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "35px",
                    height: "35px",
                    backgroundColor: "red",
                    borderRadius: "50%",
                    color: "white",
                    fontSize: "12px",
                    fontWeight: "bold",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                    cursor: "pointer",
                    zIndex: "999",
                  }}
                >
                  {almostExpired.length}
                </div>
                <div
                  onClick={handleExNotificationClick}
                  className="fixed cursor-pointer p-4 text-3xl bg-prime rounded-full bottom-[70px] right-8 hover:bg-sec"
                >
                  <RiAlarmWarningLine />
                </div>
              </>
            )}
            <span className="flex justify-end">
              <FaShoppingBag style={{fontSize: "6rem", color: "#0369a1"}} />
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
              <FaHistory style={{fontSize: "8.1rem", color: "#991b1b"}} />
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

      <div className="flex justify-center pt-3 my-8 text-ter">
        <div className="flex-col w-5/12">
          <div className={`${card} bg-purple-400`}>
            <span>New Products</span>
            {/* {data && data.map((data) => <p key={data.id}>{data.numOfSales}</p>)}
      {error && <p>{error}</p>} */}
            <p className="flex items-center gap-x-2">
              <p>Recent:</p>
              {products.length &&
                `${products[0].productName} (${products[0].quantity})`}
            </p>
            <span className="flex justify-end">
              <HiTemplate
                className="text-purple-600"
                style={{fontSize: "6rem"}}
              />
            </span>
          </div>
          <div className="bg-purple-600 font-normal text-base">
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
            bottom: "160px",
            right: "110px",
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
          <p
            className="hover:underline hover:text-red-500 text-red-700"
            style={{fontSize: "12px"}}
          >
            Click here to view more details.
          </p>
        </div>
      )}

      {showExNotificationText && (
        <div
          style={{
            position: "fixed",
            bottom: "60px",
            right: "110px",
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
          <p
            className="hover:underline hover:text-red-500 text-red-700"
            style={{fontSize: "12px"}}
          >
            Click here to view more details.
          </p>
        </div>
      )}
    </div>
  );
}
