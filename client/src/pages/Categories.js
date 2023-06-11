import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addCategory, getCategories} from "../features/userSlice";
import {toast} from "react-hot-toast";
import DeleteCategoryButton from "../components/DeleteCategoryButton";
import {FiEdit} from "react-icons/fi";
import UpdateCategoryForm from "../components/UpdateCategoryForm";

import CategoryTable from "../components/CategoryTable";

export default function Categories() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [categoryData, setCategoryData] = useState({
    categoryName: "",
    categoryDescription: "",
  });

  const {categoryName, categoryDescription} = categoryData;

  const {categories, user} = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) navigate("/login");
    dispatch(getCategories());
  }, [navigate, dispatch, addCategory, getCategories]);

  const onChange = (e) => {
    setCategoryData({...categoryData, [e.target.name]: e.target.value});
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addCategory({categoryData, toast}));
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

  const handleModal = () => {
    // setCategoryToEdit(categories);
    setShowEditModal(true);
  };

  const label = "flex text-base font-mont font-medium pt-2";
  const input =
    "w-full text-sm font-normal p-1 border-2 border-sec border-opacity-50 focus:border-prime focus:outline-none rounded";

  const handleCategoryEdit = (category) => {
    setCategoryToEdit(category);
  };

  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-between">
        <h1 className="font-mont">Categories</h1>
        <button
          className="bg-emerald-500 text-white hover:bg-emerald-400 font-bold uppercase text-sm px-6 py-3 rounded"
          type="button"
          onClick={() => setShowModal(true)}
        >
          + Add Category
        </button>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-screen">
            <div className="relative w-auto my-6 mx-auto">
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
                        style={{resize: "none"}}
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

      <CategoryTable
        data={filteredCategories}
        search={search}
        setSearch={setSearch}
        handleModal={handleModal}
        handleCategoryEdit={handleCategoryEdit}
      />

      {showEditModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-screen">
            <div className="relative w-auto my-6 mx-auto">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xl font-semibold">Edit Category</h3>
                </div>
                {/*body*/}
                <div className="relative p-3 flex-auto">
                  <UpdateCategoryForm category={categoryToEdit} />
                  <button
                    className="block mx-auto mt-4 py-2 px-4 bg-gray-500 text-white rounded "
                    onClick={() => setShowEditModal(false)}
                  >
                    Close
                  </button>
                </div>
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </div>
  );
}
