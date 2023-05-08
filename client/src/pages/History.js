import { FaCaretRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getSales } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function History() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sales } = useSelector((state) => state.user);

  const { salesHistory, user } = useSelector((state) => state.user);
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  useEffect(() => {
    if (!user) navigate("/login");
    dispatch(getSales());
  }, [getSales, dispatch, navigate, user, selectedMonth]);

  //sort by months

  const sortedSalesHistory = salesHistory.filter(
    (sale) =>
      new Date(sale.createdAt).toISOString().slice(0, 7) === selectedMonth
  );

  return (
    <div>
      <h1 className="font-mont flex items-center">
        <Link className="hover:underline" to="/">
          Dashboard
        </Link>{" "}
        <span>
          <FaCaretRight />
        </span>
        History
      </h1>
      <div>
        <h2 className="text-lg mt-6">Order History - Report Data</h2>
        <div className="flex-col">
          <div className="flex items-center gap-x-2 py-3">
            <span className="text-base font-medium">Sort by: </span>
            <input
              className="w-40 text-xs font-normal p-1 border-2 border-sec border-opacity-50 focus:border-prime focus:outline-none rounded"
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            />
          </div>
          <div className="flex h-full">
            <table className="w-full border-2 border-acsent">
              <tbody>
                <tr className="flex justify-between items-center text-lg text-center w-full">
                  <th className="w-full">Date</th>
                  <th className="w-full">Product</th>
                  <th className="w-full">Amount</th>
                </tr>
                {salesHistory &&
                  salesHistory.length > 0 &&
                  sortedSalesHistory.map((sale) => (
                    <tr
                      key={sale._id}
                      className="flex justify-between text-sm font-light text-center"
                    >
                      <td className="w-full">
                        {new Date(sale.createdAt).toLocaleDateString()}
                      </td>
                      <td className="w-full">{sale.product}</td>
                      <td className="w-full">{sale.price}</td>
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
