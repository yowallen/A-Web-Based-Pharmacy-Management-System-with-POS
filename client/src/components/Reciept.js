import React from "react";

const Reciept = ({sale, closeModal, cash, isDiscounted}) => {
  // function printReceipt() {
  //   const printContents = document.getElementById("receipt").innerHTML;
  //   const originalContents = document.body.innerHTML;

  //   document.body.innerHTML = printContents;
  //   window.print();

  //   setTimeout(function () {
  //     document.body.innerHTML = originalContents;
  //   }, 100);
  // }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div id="print-content printable" className="print-only">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg
                    className="h-6 w-6 text-green-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Invoice
                  </h3>
                  <p className="text-base ">
                    CORISOTO's Pharmacy and Dentistry
                  </p>
                  <p className="text-base">
                    145 J. P. Rizal St, Balite, Rodriguez, 1860 Rizal
                  </p>
                  <p className="text-sm text text-gray-500 mb-4">
                    Receipt:{" "}
                    {sale.sales &&
                      sale.sales.length > 0 &&
                      sale.sales[0].receipt}
                    <br /> Sold By: {sale.soldBy}
                    <br />
                  </p>
                  <div>
                    <table className="w-full mt-4">
                      <thead>
                        <tr className="text-base">
                          <th className="tracking-wide text-gray-500 font-bold pr-2">
                            PRODUCT:
                          </th>
                          <th className="tracking-wide text-gray-500 font-bold pr-2">
                            PRICE:
                          </th>
                          <th className="tracking-wide text-gray-500 font-bold pr-2">
                            QTY:
                          </th>
                          <th className="tracking-wide text-gray-500 font-bold pr-2">
                            TOTAL:
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {sale.sales &&
                          sale.sales.map((sale) => (
                            <tr
                              key={sale.receipt}
                              className="text-sm font-medium"
                            >
                              <td className="border-b border-gray-200 p-1">
                                {sale.product}
                              </td>

                              <td className="border-b border-gray-200 p-1">
                                {sale.price}
                              </td>

                              <td className="border-b border-gray-200 p-1">
                                {sale.quantity}
                              </td>

                              <td className="border-b border-gray-200 p-1">
                                {sale.total}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    <p className="text-sm text-right text-gray-500 mt-4">
                      Overall Total:{" "}
                      {sale.sales &&
                        sale.sales.reduce((total, item) => {
                          return total + item.price * item.quantity;
                        }, 0)}
                      <br />
                      {sale.discountedTotal && (
                        <>
                          Discounted Total: {sale.discountedTotal}
                          <br />
                        </>
                      )}
                      Cash: {cash} <br />
                      change:{" "}
                      {isDiscounted
                        ? (cash - sale.discountedTotal).toFixed(2)
                        : (cash - sale.totalSales).toFixed(2)}{" "}
                      <br />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => window.print()}
              >
                Print
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reciept;
