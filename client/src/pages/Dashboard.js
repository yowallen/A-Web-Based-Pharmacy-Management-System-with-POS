import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {
  FaShoppingBag,
  FaChartBar,
  FaBoxes,
  FaArrowCircleRight,
  FaHistory,
} from "react-icons/fa";
import {TbCurrencyPeso} from "react-icons/tb";
import {HiTemplate} from "react-icons/hi";
import {
  getTodaySalesTotal,
  getSalesCountToday,
  getCostToday,
  productCount,
  topProducts,
  lowProducts,
  getAlmostExpired,
  getProducts,
} from "../features/userSlice";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {RiAlarmWarningLine} from "react-icons/ri";
import {IoWarningOutline} from "react-icons/io5";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    salesToday,
    salesCountToday,
    productsCount,
    user,
    products,
    lowProduct,
    almostExpired,
  } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) navigate("/login");
    dispatch(getTodaySalesTotal());
    dispatch(getSalesCountToday());
    dispatch(productCount());
    dispatch(topProducts());
    dispatch(lowProducts());
    dispatch(getAlmostExpired());
    dispatch(getProducts());
    dispatch(getCostToday());
  }, [dispatch, navigate, user]);

  const card = "py-3 px-6";

  return (
    <div className="font-pop h-full w-full">
      <h1 className="font-mont mb-6">Dashboard</h1>
      <div className="flex gap-x-8">
        <div className="flex flex-col text-ter basis-2/3 gap-y-8">
          <div className="shadow-xl">
            <div className={`${card} bg-amber-500 rounded-t-xl`}>
              <span>Total Sales Today</span>
              <p className="flex items-center">
                <TbCurrencyPeso />
                {salesToday}
              </p>
              <span className="flex justify-end">
                <FaChartBar style={{fontSize: "6rem", color: "#b45309"}} />
              </span>
            </div>
            <div className="bg-amber-700 font-normal text-base rounded-b-xl">
              <Link to="sales">
                <div className="flex items-center justify-center gap-x-2">
                  <span>More Info</span>
                  <FaArrowCircleRight />
                </div>
              </Link>
            </div>
          </div>

          <div className="shadow-xl">
            <div className={`${card} bg-emerald-600 rounded-t-xl`}>
              <span>Todays Total Order</span>
              <p className="flex items-center gap-x-2">
                {salesCountToday}{" "}
                <p className="text-base">orders been processed</p>
              </p>
              <span className="flex justify-end">
                <FaBoxes style={{fontSize: "6rem", color: "#065f46"}} />
              </span>
            </div>
            <div className="bg-emerald-800 font-normal text-base rounded-b-xl">
              <Link to="orders">
                <div className="flex items-center justify-center gap-x-2">
                  <span>More Info</span>
                  <FaArrowCircleRight />
                </div>
              </Link>
            </div>
          </div>

          <div className="flex gap-x-8">
            <div className="shadow-xl basis-1/2">
              <div className={`${card} bg-purple-400 rounded-t-xl`}>
                <span>New Deliveries</span>
                <p className="flex items-center text-lg gap-x-2">
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
              <div className="bg-purple-600 font-normal text-base rounded-b-xl">
                <Link to="/new">
                  <div className="flex items-center justify-center gap-x-2">
                    <span>More Info</span>
                    <FaArrowCircleRight />
                  </div>
                </Link>
              </div>
            </div>

            <div className="shadow-xl basis-1/2">
              <div className={`${card} bg-sky-500 rounded-t-xl`}>
                <span>Total Products</span>
                <p className="flex items-center gap-x-2">
                  {productsCount} <p className="text-base">products</p>
                </p>
                <span className="flex justify-end">
                  <FaShoppingBag style={{fontSize: "6rem", color: "#0369a1"}} />
                </span>
              </div>
              <div className="bg-sky-700 font-normal text-base rounded-b-xl">
                <Link to="inventory">
                  <div className="flex items-center justify-center gap-x-2">
                    <span>More Info</span>
                    <FaArrowCircleRight />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col text-ter gap-y-8 basis-1/3">
          <div className="shadow-xl">
            <div className={`${card} bg-prime rounded-t-xl flex flex-col`}>
              <span>Low on Stock</span>
              <p className="rounded-full w-8 h-8 items-center justify-center inline-flex bg-red-500">
                {lowProduct.length}
              </p>
              <span className="flex justify-end">
                <IoWarningOutline className="text-[4rem] mt-8 text-sec" />
              </span>
            </div>
            <div className="bg-sec font-normal text-base rounded-b-xl">
              <Link to="/low">
                <div className="flex items-center justify-center gap-x-2">
                  <span>More Info</span>
                  <FaArrowCircleRight />
                </div>
              </Link>
            </div>
          </div>

          <div className="shadow-xl">
            <div className={`${card} bg-prime rounded-t-xl flex flex-col`}>
              <span>Nearly Expired</span>
              <p className="rounded-full w-8 h-8 items-center justify-center inline-flex bg-red-500">
                {almostExpired.length}
              </p>
              <span className="flex justify-end">
                <RiAlarmWarningLine className="text-[4rem] mt-8 text-sec" />
              </span>
            </div>
            <div className="bg-sec font-normal text-base rounded-b-xl">
              <Link to="/expired">
                <div className="flex items-center justify-center gap-x-2">
                  <span>More Info</span>
                  <FaArrowCircleRight />
                </div>
              </Link>
            </div>
          </div>

          <div className="shadow-xl">
            <div className={`${card} bg-red-500 rounded-t-xl`}>
              <span>Order History</span>
              <span className="flex justify-end">
                <FaHistory className="text-8xl mt-8 text-red-800" />
              </span>
            </div>
            <div className="bg-red-800 font-normal text-base rounded-b-xl">
              <Link to="history">
                <div className="flex items-center justify-center gap-x-2">
                  <span>More Info</span>
                  <FaArrowCircleRight />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
