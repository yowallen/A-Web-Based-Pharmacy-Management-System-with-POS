import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { userLogin } from "../features/userSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    userName: "",
    password: "",
  });

  const { userName, password } = userData;

  const { user } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin({ userData, navigate, toast }));
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [navigate, dispatch, handleSubmit]);

  const label = "flex py-3 font-mont font-medium";
  const input =
    "w-full p-2 border-2 border-sec border-opacity-50 focus:border-prime focus:outline-none rounded";

  return (
    <div className="login flex justify-center items-center w-full h-screen">
      <section className="w-7/12 h-4/6 shadow-2xl rounded-lg px-14 py-4 bg-white">
        <div className="text-center">
          <h2 className="font-lob text-3xl my-5 text-prime">
            Corisoto's <br /> Pharmacy
          </h2>
          <h1 className="font-mont font-black text-4xl text-gray-900 my-8">
            Login to your account
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex-col">
            <label className={label}>
              <span>Email/Mobile</span>
            </label>
            <input
              className={input}
              type="text"
              placeholder="Enter your username"
              value={userName}
              name="userName"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className={label}>
              <span>Password</span>
            </label>
            <input
              className={input}
              placeholder="Enter your Password"
              value={password}
              name="password"
              onChange={handleChange}
              type="password"
            />
          </div>

          <button
            className="w-full bg-prime mt-5 rounded text-slate-50 font-bold font-pop p-2 hover:bg-sec"
            type="submit"
          >
            Login
          </button>
        </form>

        <p className="my-9 font-pop font-normal text-center">
          Didn't have an account yet? Please kindly contact the owner.
        </p>
      </section>
    </div>
  );
}
