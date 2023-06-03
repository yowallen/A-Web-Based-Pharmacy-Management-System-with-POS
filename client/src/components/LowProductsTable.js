import React, { useRef } from "react";
import DataTable from "react-data-table-component";
import { BiSearchAlt } from "react-icons/bi";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const LowProductsTable = ({ data, search, setSearch }) => {
  const customStyles = {
    header: {
      style: {
        fontSize: "1.5rem",
        fontFamily: "Montserrat",
      },
    },
    headCells: {
      style: {
        fontSize: "0.875rem",
        backgroundColor: "#424874",
        color: "#fff",
      },
    },
    cells: {
      style: {
        fontWeight: 600,
      },
    },
  };

  const columns = [
    {
      name: "Product",
      selector: (row) => <div>{row.productName}</div>,
    },
    {
      name: "Expiration Date",
      selector: (row) =>
        new Date(row.expiryDate).toLocaleDateString("en-US", {
          dateStyle: "medium",
        }),
      sortable: true,
    },

    {
      name: "Stock Available",
      selector: (row) => row.quantity,
      sortable: true,
    },
  ];

  const tableRef = useRef(null);

  const handleDownload = async () => {
    const dataTableElement = tableRef.current;

    html2canvas(dataTableElement, { scale: 2 }).then((canvas) => {
      const screenshotDataUrl = canvas.toDataURL("image/png");
      const printWindow = window.open("", "_blank");
      printWindow.document.open();
      printWindow.document.write(`
      <html>
        <head>
          <title>Print</title>
          <style>
            img {
              width: 100%;

            }
            @media print {
              .hide-in-print {
                display: none !important;
              }
            }
          </style>
        </head>
        <body>
          <div>
            <img src="${screenshotDataUrl}" />
          </div>
        </body>
      </html>
    `);
      printWindow.document.close();
      printWindow.print();
    });
  };

  const handleExportPDF = () => {
    const dataTableElement = tableRef.current;

    // Generate the canvas from the table element
    html2canvas(dataTableElement).then((canvas) => {
      const screenshotDataUrl = canvas.toDataURL("image/png");

      // Create a new jsPDF instance
      const pdf = new jsPDF();

      // Calculate the dimensions and position for the table in the PDF
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const aspectRatio = canvas.width / canvas.height;
      const pdfTableWidth = pdfWidth - 20; // Adjust the width as needed
      const pdfTableHeight = pdfTableWidth / aspectRatio;
      const x = 10; // Adjust the X position as needed
      const y = (pdfHeight - pdfTableHeight) / 2; // Adjust the Y position as needed

      // Add the table image to the PDF
      pdf.addImage(
        screenshotDataUrl,
        "PNG",
        x,
        y,
        pdfTableWidth,
        pdfTableHeight
      );

      // Save the PDF
      pdf.save("inventory.pdf");
    });
  };

  return (
    <div>
      <h1 className="pb-5">Low Product List</h1>
      <div ref={tableRef}>
        <DataTable
          columns={columns}
          data={data}
          customStyles={customStyles}
          highlightOnHover
          pagination
          fixedHeader
          fixedHeaderScrollHeight="550px"
          subHeader
          subHeaderAlign="left"
          subHeaderComponent={
            <div className={`flex items-center "hide-in-print"`}>
              <BiSearchAlt />
              <input
                type="text"
                className="w-72 ml-4 text-sm font-normal p-2 border-2 border-sec border-opacity-50 focus:border-prime focus:outline-none rounded"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search Product Name"
              />
            </div>
          }
        />
      </div>
      <button onClick={handleDownload}>Download Table</button>
    </div>
  );
};

export default LowProductsTable;
