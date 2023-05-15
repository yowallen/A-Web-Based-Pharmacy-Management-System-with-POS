import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, allUser } from "../features/userSlice";
import { toast } from "react-hot-toast";
import UpdateUser from "../components/UpdateUser";

import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ManageUsers() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleEditClick = (user) => {
    setSelectedUserId(user);
  };

  const handleClose = () => {
    setSelectedUserId(null);
  };

  const label = "flex text-base font-mont font-medium pt-2";
  const input =
    "w-full text-sm font-normal p-1 border-2 border-sec border-opacity-50 focus:border-prime focus:outline-none rounded";

  const eye = {
    color: "#424874",
    fontSize: "1.5rem",
    margin: ".5rem",
    opacity: ".8",
  };
  const inputPass =
    "w-full text-sm font-normal p-1 border-2 border-sec border-opacity-50 focus:border-prime focus:outline-none rounded";
  const [passtype, setPassType] = useState("password");
  const handlePass = () => {
    if (passtype === "password") {
      setPassType("text");
      return;
    }
    setPassType("password");
  };

  const { user, users } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (user.role !== "Admin") {
      navigate("/");
      toast.error("You are not authorized to view this page");
    } else {
      dispatch(allUser());
    }
  }, [navigate, dispatch, allUser, addUser]);

  const [userData, setUserData] = useState({
    fullName: "",
    userName: "",
    password: "",
    role: "",
  });

  const { fullName, userName, password, role } = userData;

  const onChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
      role: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser({ userData, toast }));
    setShowModal(false);
    setUserData({
      fullName: "",
      userName: "",
      password: "",
      role: "",
    });
  };

  const [search, setSearch] = useState("");
  const filteredUsers = users.filter((category) => {
    if (search === "") {
      return true; // Render all categories when search is empty
    }

    const categoryName = category.fullName.toLowerCase();
    const searchInput = search.toLowerCase();

    if (categoryName.startsWith(searchInput)) {
      return true; // Match if category name starts with the search input
    }

    const words = categoryName.split(" ");
    return words.some((word) => word === searchInput); // Match if any word in category name is equal to the search input
  });

  return (
    <div>
      <h1 className="font-mont">Manage Users</h1>
      <button
        className="bg-emerald-500 text-white hover:bg-emerald-400 font-bold uppercase text-sm px-6 py-3 rounded"
        type="button"
        onClick={() => setShowModal(true)}
      >
        + Add User
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-screen">
            <div className="relative w-auto my-6 mx-auto w-96">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xl font-semibold">Adding New User</h3>
                </div>
                {/*body*/}
                <div className="relative p-3 flex-auto">
                  <form onSubmit={onSubmit}>
                    <div className="flex-col">
                      <label className={label}>Full Name:</label>
                      <input
                        type="text"
                        className={input}
                        placeholder="Enter name of user"
                        value={fullName}
                        onChange={onChange}
                        name="fullName"
                      />
                    </div>

                    <div className="flex-col">
                      <label className={label}>Username:</label>
                      <input
                        type="text"
                        className={input}
                        placeholder="Enter name of user"
                        value={userName}
                        onChange={onChange}
                        name="userName"
                      />
                    </div>

                    <label className={label}>Password:</label>
                    <div className="flex items-center">
                      <input
                        className={inputPass}
                        name="password"
                        type={passtype}
                        placeholder="********"
                        value={password}
                        onChange={onChange}
                      />
                      <span className="cursor-pointer" onClick={handlePass}>
                        {passtype === "password" ? (
                          <FaEye style={eye} />
                        ) : (
                          <FaEyeSlash style={eye} />
                        )}
                      </span>
                    </div>

                    <div className="flex-col">
                      <label className={label}>User Type:</label>
                      <select
                        name="role"
                        id=""
                        className={input}
                        onChange={onChange}
                      >
                        <option hidden>Select User Type</option>
                        <option value="Staff">Staff</option>
                        <option value="Admin">Admin</option>
                      </select>
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
                        Add User
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
            <span>Showing 1 to 1 of 1 Entries</span>
            <div className="flex gap-x-2 items-center">
              <label>Search:</label>
              <input
                type="text"
                className="w-60 text-xs font-normal p-1 border-2 border-sec border-opacity-50 focus:border-prime focus:outline-none rounded"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="flex h-full">
            <table className="w-full border-2 border-acsent">
              <thead>
                <tr className="flex justify-between items-center text-lg text-center w-full">
                  <th className="w-full">#</th>
                  <th className="w-full">Full Name</th>
                  <th className="w-full">Username</th>
                  <th className="w-full">User Type</th>
                  <th className="w-full">Action</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  filteredUsers.map((user, index) => (
                    <tr
                      key={index}
                      className="flex justify-between text-sm font-light text-center"
                    >
                      <td className="w-full items-center justify-center">
                        {index + 1}
                      </td>
                      <td className="w-full">{user.fullName}</td>
                      <td className="w-full">{user.userName}</td>
                      <td className="w-full">{user.role}</td>
                      <td className="w-full">
                        <button
                          onClick={() => handleEditClick(user)}
                          className="py-1 px-2 bg-sky-500 text-white rounded"
                        >
                          Edit user
                        </button>
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
        {selectedUserId && (
          <UpdateUser user={selectedUserId} onClose={handleClose} />
        )}
      </div>
    </div>
  );
}
