import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
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
} from "../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// const { data, error } = useFetch("http://localhost:8000/proxyData");

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
    dispatch(getTodaySalesTotal());
    dispatch(getSalesCountToday());
    dispatch(productCount());
  }, [dispatch, navigate]);

  const { salesToday, salesCountToday, productsCount, user } = useSelector(
    (state) => state.user
  );

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
    </div>
  );
}
