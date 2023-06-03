import React, { useEffect } from "react";
import BarChart from "../components/BarChart";
import { FaCaretRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMonthSales } from "../features/userSlice";

export default function Sales() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { monthSales, user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    dispatch(getMonthSales());
  }, [dispatch, getMonthSales, navigate]);

  const chartData = {
    labels: monthSales.map((sales) => sales.month),
    datasets: [
      {
        label: "Total Sales",
        backgroundColor: "rgba(75,192,192,1)",
        data: monthSales.map((sales) => sales.sales),
      },
      {
        label: "Total Cost",
        backgroundColor: "gold",
        data: monthSales.map((sales) => sales.cost),
      },
    ],
  };

  return (
    <div>
      <h1 className="font-mont flex items-center">
        <Link className="hover:underline" to="/">
          Dashboard
        </Link>{" "}
        <span>
          <FaCaretRight />
        </span>
        Total Sales
      </h1>
      <BarChart chartData={chartData} />
    </div>
  );
}
