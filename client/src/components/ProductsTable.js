import DataTable from "react-data-table-component";
import {TbCurrencyPeso} from "react-icons/tb";
import {BiSearchAlt} from "react-icons/bi";

export default function ProductsTable({
  data,
  search,
  setSearch,
  handleModal,
  productOnEdit,
}) {
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

  const applyConditionalStyles = (row) => {
    if (row.quantity <= row.productLimit) {
      return {backgroundColor: "yellow"};
    }
    return null;
  };

  const conditionalRowStyles = [
    {
      when: applyConditionalStyles,
      style: {
        backgroundColor: "yellow",
      },
    },
  ];

  const columns = [
    {
      name: "Product",
      selector: (row) =>
        row.prescriptionRequired ? (
          <div>
            <div className="flex items-center gap-x-1">
              <div className="p-1 bg-emerald-600"></div>
              <div>{row.productName}</div>
            </div>
            <div className="font-light">
              <p>Measurement: {row.measurement}</p>
              <p>Description: {row.productType}</p>
              <p>Limit: {row.productLimit}</p>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-x-1">
              <div className="p-1 bg-amber-400"></div>
              <div>{row.productName}</div>
            </div>
            <div className="font-light">
              <p>Measurement: {row.measurement}</p>
              <p>Description: {row.productType}</p>
              <p>Limit: {row.productLimit}</p>
            </div>
          </div>
        ),
    },
    {
      name: "Stocks",
      selector: (row) => row.quantity,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "Price",
      cell: (row) => (
        <span className="flex items-center">
          <TbCurrencyPeso /> {row.price}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Cost",
      cell: (row) => (
        <span className="flex items-center">
          <TbCurrencyPeso /> {row.cost}
        </span>
      ),
      sortable: true,
    },

    {
      name: "Action",
      cell: (row) => (
        <button
          onClick={() => {
            handleModal();
            productOnEdit(row);
          }}
          className="py-1 px-2 bg-emerald-500 text-white rounded font-semibold hover:bg-emerald-300"
        >
          update
        </button>
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
        conditionalRowStyles={conditionalRowStyles}
      />
    </div>
  );
}
