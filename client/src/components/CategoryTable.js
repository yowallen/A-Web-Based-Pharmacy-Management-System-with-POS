import React from "react";
import DataTable from "react-data-table-component";
import DeleteCategoryButton from "../components/DeleteCategoryButton";
import { FiEdit } from "react-icons/fi";
import { BiSearchAlt } from "react-icons/bi";

const CategoryTable = ({
  data,
  search,
  setSearch,
  handleModal,
  handleCategoryEdit,
}) => {
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
      name: "Category Name",
      selector: (row) => row.categoryName,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.categoryDescription,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="p-3 space-x-1">
          <button
            onClick={() => {
              handleCategoryEdit(row); // Call the handleCategoryEdit function
              handleModal();
            }}
            className="p-2 bg-emerald-500 text-white rounded hover:bg-emerald-400"
          >
            <FiEdit />
          </button>
          <DeleteCategoryButton categoryId={row._id} />
        </div>
      ),
    },
  ];

  return (
    <div className="pt-5">
      <DataTable
        columns={columns}
        data={data}
        customStyles={customStyles}
        pagination
        highlightOnHover
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
              placeholder="Search Category Name"
            />
          </div>
        }
      />
    </div>
  );
};

export default CategoryTable;
