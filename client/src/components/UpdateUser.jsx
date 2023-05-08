import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../features/userSlice";
import { toast } from "react-hot-toast";

const UpdateUser = ({ user, onClose }) => {
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    fullName: user.fullName,
    userName: user.userName,
    password: "",
    role: user.role,
  });

  const onChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      fullName,
      userName,
      password: password ? password : "",
      role,
    };
    dispatch(editUser({ id: user._id, userData, toast }));
  };

  const { fullName, userName, password, role } = userData;
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
  return (
    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
        <h3 className="text-xl font-semibold">Edit User</h3>
      </div>

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

          <label className={label}>New Password:</label>
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
              value={role}
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
              onClick={onClose}
            >
              Close
            </button>
            <button
              className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
