import React, { useEffect, useState } from "react";
import BarChart from "../components/BarChart";
import { UserData } from "../components/Data";
import { FaCaretRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMonthSales, topProducts } from "../features/userSlice";

export default function Sales() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [userData, setUserData] = useState({
  //   labels: UserData.map((data) => data.month),
  //   datasets: [
  //     {
  //       label: "Monthly Sales",
  //       data: UserData.map((data) => data.userGain),
  //       backgroundColor: ["#A6B1E1"],
  //       borderColor: "#424874",
  //       borderWidth: 2,
  //     },
  //   ],
  // });

  const { monthSales, user, topProduct } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    dispatch(getMonthSales());
    dispatch(topProducts());
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
        label: "Highest Sales",
        backgroundColor: "gold",
        data: topProduct.map((product) => product.sales),
        // Add a custom tooltip function to show the topProduct label
        // alongside the sales data
        tooltip: {
          callbacks: {
            label: function (context) {
              const label = context.dataset.label || "";
              if (label) {
                const topProductValue =
                  topProduct[context.dataIndex]?.topProduct || "N/A";
                return `${label}: ${context.formattedValue} (${topProductValue})`;
              } else {
                const topProductValue =
                  topProduct[context.dataIndex]?.topProduct || "N/A";
                return `${context.formattedValue} (${topProductValue})`;
              }
            },
          },
        },
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
