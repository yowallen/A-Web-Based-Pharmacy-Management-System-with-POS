import {FaCaretRight} from "react-icons/fa";
import {Link} from "react-router-dom";
import {getSales} from "../features/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {TbCurrencyPeso} from "react-icons/tb";

export default function History() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sortedSalesHistory, setSortedSalesHistory] = useState([]);

  const {salesHistory, user} = useSelector((state) => state.user);
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
        const saleYearMonth = saleDate.toISOString().slice(0, 7); // Extract year and month portion
        return saleYearMonth === selectedMonth;
      } catch (error) {
        console.error("Error filtering sales history:", error);
        return false;
      }
    });
    setSortedSalesHistory(filteredSalesHistory);
  }, [salesHistory, selectedMonth]); // Include sortedSalesHistory in the dependency array

  function downloadCSV() {
    const total = sortedSalesHistory.reduce(
      (total, sale) => total + (sale.total - sale.cost),
      0
    );

    const rows = [
      ["", "", "SALES HISTORY", "", `Total Earnings: ${total.toString()}`], // Header title
      ["Date", "Product", "Sale", "Costing", "Earnings", "Sold by"],
      ...sortedSalesHistory.map((sale) => [
        new Date(sale.createdAt).toLocaleDateString(),
        sale.product,
        sale.total,
        sale.cost,
        sale.total - sale.cost,
        sale.soldBy,
      ]),
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
          <div className="flex items-center justify-between pb-4">
            <div>
              <span className="text-base font-medium">Sort by: </span>
              <input
                className="w-40 text-xs font-normal p-1 border-2 border-sec border-opacity-50 focus:border-prime focus:outline-none rounded"
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              />
            </div>

            {sortedSalesHistory.length > 0 && (
              <div className="flex items-center border-2 border-prime rounded px-3 py-1 text-lg text-gray-700">
                Total Earnings:{" "}
                <p className="flex items-center">
                  <TbCurrencyPeso />
                  {sortedSalesHistory.reduce(
                    (total, sale) => total + (sale.total - sale.cost), // Sum earnings
                    0
                  )}
                </p>
              </div>
            )}

            <button
              onClick={downloadCSV}
              className="bg-prime text-white px-4 py-2 rounded text-sm font-medium hover:bg-sec"
            >
              Download file
            </button>
          </div>
          <div className="flex h-full">
            <table className="w-full border-2 border-acsent">
              <tbody>
                <tr className="flex justify-between items-center text-lg text-center w-full">
                  <th className="w-full">Date</th>
                  <th className="w-full">Product</th>
                  <th className="w-full">Sales</th>
                  <th className="w-full">Cost</th>
                  <th className="w-full">Earnings</th>
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
                      <td className="w-full">{sale.cost}</td>
                      <td className="w-full">{sale.total - sale.cost}</td>
                      <td className="w-full">{sale.soldBy}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
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
