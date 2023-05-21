import React from "react";
import DataTable from "react-data-table-component";

const TotalOrdersTable = ({data, search, setSearch}) => {
  const customStyles = {
    header: {
      style: {
        fontSize: "1.5rem",
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
      name: "Date",
      selector: (row) => new Date(row.createdAt).toDateString(),
      sortable: true,
    },
    {
      name: "Product",
      selector: (row) => row.product,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.total,
      sortable: true,
    },
    {
      name: "Sold By",
      selector: (row) => row.soldBy,
      sortable: true,
    },
  ];
  return (
    <div className="pt-5">
      <DataTable
        title="Total Paid Orders - Report Data"
        columns={columns}
        data={data}
        customStyles={customStyles}
        pagination
        fixedHeaderScrollHeight="550px"
        highlightOnHover
      />
    </div>
  );
};

export default TotalOrdersTable;
