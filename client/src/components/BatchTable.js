import React from "react";
import DataTable from "react-data-table-component";
import {BiSearchAlt} from "react-icons/bi";

const BatchTable = ({data, search, setSearch}) => {
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
      selector: (row) =>
        row.prescriptionRequired ? (
          <div className="flex items-center gap-x-1">
            <div className="p-1 bg-emerald-600"></div>
            <div>{row.productName}</div>
          </div>
        ) : (
          <div className="flex items-center gap-x-1">
            <div className="p-1 bg-amber-400"></div>
            <div>{row.productName}</div>
          </div>
        ),
    },
    {
      name: "Encoded",
      selector: (row) =>
        new Date(row.updatedAt).toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        }),
      sortable: true,
    },
    {
      name: "Latest Expiry Date",
      selector: (row) => new Date(row.expiryDate).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Stock In",
      selector: (row) => row.stockedIn,
      sortable: true,
    },
  ];
  return (
    <div>
      <h1 className="pb-5">Supply List</h1>
      <DataTable
        columns={columns}
        data={data}
        customStyles={customStyles}
        pagination
        highlightOnHover
        fixedHeader
        fixedHeaderScrollHeight="550px"
        subHeader
        subHeaderAlign="left"
        subHeaderComponent={
          <div className="flex items-center">
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
  );
};

export default BatchTable;
