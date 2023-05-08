import { FaCaretRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getSalesToday } from "../features/userSlice";

export default function TotalOrders() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) navigate("/login");
    dispatch(getSalesToday());
  }, [(dispatch, navigate)]);

  const { user, salesHistoryToday } = useSelector((state) => state.user);

  console.log(salesHistoryToday);

  return (
    <div>
      <h1 className="font-mont flex items-center">
        <Link className="hover:underline" to="/">
          Dashboard
        </Link>{" "}
        <span>
          <FaCaretRight />
        </span>
        Total Orders
      </h1>
      <div>
        <h2 className="text-lg mt-6">Total Paid Orders - Report Data</h2>
        <div className="flex-col">
          <div className="flex h-full">
            <table className="w-full border-2 border-acsent">
              <thead>
                <tr className="flex justify-between items-center text-lg text-center w-full">
                  <th className="w-full">Date</th>
                  <th className="w-full">Product</th>
                  <th className="w-full">Amount</th>
                  <th className="w-full">Sold By</th>
                </tr>
              </thead>
              <tbody>
                {salesHistoryToday &&
                  salesHistoryToday.length > 0 &&
                  salesHistoryToday.map((sale) => (
                    <tr
                      key={sale._id}
                      className="flex justify-between text-sm font-light text-center"
                    >
                      <td className="w-full">
                        {new Date(sale.createdAt).toDateString()}
                      </td>
                      <td className="w-full">{sale.product}</td>
                      <td className="w-full">{sale.total}</td>
                      <td className="w-full">{sale.soldBy}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center items-center text-base gap-x-1">
            <button className="border-2 py-1 px-2 rounded border-sec hover:bg-acsent">
              Previous
            </button>
            <span className="bg-prime px-2 py-1 rounded text-white">0</span>
            <button className="border-2 py-1 px-2 rounded border-sec hover:bg-acsent">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
