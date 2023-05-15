import { FaCaretRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getSales } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function History() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sortedSalesHistory, setSortedSalesHistory] = useState([]);

  const { salesHistory, user } = useSelector((state) => state.user);
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  useEffect(() => {
    if (!user) navigate("/login");
    dispatch(getSales());
    setSelectedMonth(new Date().toISOString().slice(0, 7)); // Reset the selected month to the current month
  }, [dispatch, navigate, user]);

  useEffect(() => {
    // Filter the sales history based on the selected month
    const filteredSalesHistory = salesHistory.filter((sale) => {
      try {
        const saleDate = new Date(sale.createdAt);
        if (isNaN(saleDate.getTime())) {
          // Invalid date, skip this sale
          return false;
        }
        return saleDate.toISOString().slice(0, 7) === selectedMonth;
      } catch (error) {
        console.error("Error filtering sales history:", error);
        return false;
      }
    });
    setSortedSalesHistory(filteredSalesHistory);
  }, [salesHistory, selectedMonth]); // Include sortedSalesHistory in the dependency array

  function downloadCSV() {
    const total = sortedSalesHistory.reduce((acc, sale) => acc + sale.total, 0);

    const rows = [
      ["Date", "Product", "Amount", "Sold by"],
      ...sortedSalesHistory.map((sale) => [
        new Date(sale.createdAt).toLocaleDateString(),
        sale.product,
        sale.price,
        sale.soldBy,
      ]),
      ["Total", "", total.toString(), ""],
    ];

    const filename = "sales_history";

    if (Array.isArray(rows)) {
      const csvContent =
        "data:text/csv;charset=utf-8," +
        rows.map((row) => row.join(",")).join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", filename + ".csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error("rows is not an array");
    }
  }

  console.log(salesHistory);

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
                  <th className="w-full">Sold by</th>
                </tr>
                {salesHistory &&
                  salesHistory.length > 0 &&
                  sortedSalesHistory.map((sale) => (
                    <tr
                      key={sale._id}
                      className="flex justify-between text-sm font-light text-center"
                    >
                      <td className="w-full">
                        {sale.createdAt &&
                          new Date(sale.createdAt).toLocaleDateString()}
                      </td>
                      <td className="w-full">{sale.product}</td>
                      <td className="w-full">{sale.total}</td>
                      <td className="w-full">{sale.soldBy}</td>
                    </tr>
                  ))}
                {sortedSalesHistory.length > 0 && (
                  <tr className="flex justify-center text-base font-medium">
                    <td className="w-full" colSpan="4">
                      Total:{" "}
                      {sortedSalesHistory.reduce(
                        (total, sale) => total + sale.total,
                        0
                      )}
                    </td>
                  </tr>
                )}
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
          <button onClick={downloadCSV}>Download file</button>
        </div>
      </div>
    </div>
  );
}

//sort by months

// let sortedSalesHistory = salesHistory.filter(
//   (sale) =>
//     new Date(sale.createdAt).toISOString().slice(0, 7) === selectedMonth
// );
