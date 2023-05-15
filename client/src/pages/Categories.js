import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, getCategories } from "../features/userSlice";
import { toast } from "react-hot-toast";
import UpdateCategoryForm from "../components/UpdateCategoryForm";
import DeleteCategoryButton from "../components/DeleteCategoryButton";

export default function Categories() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [categoryData, setCategoryData] = useState({
    categoryName: "",
    categoryDescription: "",
  });

  const { categoryName, categoryDescription } = categoryData;

  const { categories, user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) navigate("/login");
    dispatch(getCategories());
  }, [navigate, dispatch, addCategory, getCategories]);

  const onChange = (e) => {
    setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addCategory({ categoryData, toast }));
    setCategoryData({
      categoryName: "",
      categoryDescription: "",
    });
    dispatch(getCategories());
  };

  const [search, setSearch] = useState("");
  const filteredCategories = categories.filter((category) => {
    if (search === "") {
      return true; // Render all categories when search is empty
    }

    const categoryName = category.categoryName.toLowerCase();
    const searchInput = search.toLowerCase();

    if (categoryName.startsWith(searchInput)) {
      return true; // Match if category name starts with the search input
    }

    const words = categoryName.split(" ");
    return words.some((word) => word === searchInput); // Match if any word in category name is equal to the search input
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);

  const handleUpdate = (updatedCategory) => {
    const updatedCategories = [...categories];
    const index = updatedCategories.findIndex(
      (c) => c._id === updatedCategory._id
    );
    updatedCategories[index] = updatedCategory;
    //  setFilteredCategories(updatedCategories);
    setShowEditModal(false);
    setCategoryToEdit(null);
  };

  const label = "flex text-base font-mont font-medium pt-2";
  const input =
    "w-full text-sm font-normal p-1 border-2 border-sec border-opacity-50 focus:border-prime focus:outline-none rounded";

  return (
    <div className="w-full h-full">
      <h1 className="font-mont">Categories</h1>
      <button
        className="bg-emerald-500 text-white hover:bg-emerald-400 font-bold uppercase text-sm px-6 py-3 rounded"
        type="button"
        onClick={() => setShowModal(true)}
      >
        + Add Category
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-screen">
            <div className="relative w-auto my-6 mx-auto w-96">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xl font-semibold">Adding New Category</h3>
                </div>
                {/*body*/}
                <div className="relative p-3 flex-auto">
                  <form onSubmit={onSubmit}>
                    <div className="flex-col">
                      <label className={label}>Category Name:</label>
                      <input
                        type="text"
                        className={input}
                        placeholder="Enter name of product"
                        name="categoryName"
                        value={categoryName}
                        onChange={(e) => onChange(e)}
                      />
                    </div>

                    <div className="flex-col">
                      <label className={label}>Description</label>
                      <textarea
                        id=""
                        rows="5"
                        className={input}
                        placeholder="Enter description"
                        style={{ resize: "none" }}
                        name="categoryDescription"
                        value={categoryDescription}
                        onChange={(e) => onChange(e)}
                      ></textarea>
                    </div>
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Add Category
                      </button>
                    </div>
                  </form>
                </div>
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      <div>
        <h2 className="text-xl mt-6">Manage Categories</h2>
        <div className="flex-col">
          <div className="flex items-center justify-between py-2 font-normal text-sm">
            <span>{`Showing 1 to ${filteredCategories.length} of ${categories.length} Entries`}</span>
            <div className="flex gap-x-2 items-center">
              <label>Search:</label>
              <input
                type="text"
                className="w-60 text-xs font-normal p-1 border-2 border-sec border-opacity-50 focus:border-prime focus:outline-none rounded"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
          </div>

          <div className="flex h-full">
            <table className="w-full border-2 border-acsent">
              <thead>
                <tr className="flex justify-between items-center text-lg text-center w-full">
                  <th className="w-full">#</th>
                  <th className="w-full">Category Name</th>
                  <th className="w-full">Description</th>
                  <th className="w-full">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((category, index) => (
                  <tr
                    key={category._id}
                    className="flex justify-between text-sm font-light text-center"
                  >
                    <td className="w-full items-center justify-center">
                      {index + 1}
                    </td>
                    <td className="w-full">{category.categoryName}</td>
                    <td className="w-full">{category.categoryDescription}</td>
                    <td className="w-full">
                      <button
                        className="py-1 px-2 bg-emerald-500 text-white rounded"
                        onClick={() => {
                          setCategoryToEdit(category);
                          setShowEditModal(true);
                        }}
                      >
                        Edit
                      </button>
                      <DeleteCategoryButton categoryId={category._id} />
                    </td>
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

      {showEditModal && (
        <div className="fixed left-0 right-0 mx-auto z-50 w-1/2 max-h-full overflow-auto bg-white rounded-lg shadow-lg p-4">
          <UpdateCategoryForm category={categoryToEdit} />
          <button
            className="block mx-auto mt-4 py-2 px-4 bg-gray-500 text-white rounded"
            onClick={() => setShowEditModal(false)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
