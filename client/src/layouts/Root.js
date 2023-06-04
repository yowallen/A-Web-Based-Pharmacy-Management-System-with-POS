import controlKey from "../assets/control-key.svg";
import userLogo from "../assets/userLogo.svg";
import {BiLogOutCircle} from "react-icons/bi";
import {
  FaThLarge,
  FaPrescriptionBottleAlt,
  FaBox,
  FaUsers,
  FaList,
  FaExclamationTriangle,
  FaCoins,
} from "react-icons/fa";
import {useEffect, useState} from "react";
import {Outlet, NavLink} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {userLogout} from "../features/userSlice";
import {useDispatch, useSelector} from "react-redux";

export default function Root() {
  const [openNav, setOpenNav] = useState(true);
  const navLink = `flex items-center font-pop text-acsent py-3 hover:bg-sec hover:text-prime px-2 gap-x-4 rounded-md ${
    !openNav && "justify-center"
  }`;
  const iconStyle = {fontSize: "24px"};
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user} = useSelector((state) => state.user);

  const handleOut = () => {
    dispatch(userLogout());
    window.location.reload();
  };

  useEffect(() => {
    if (!user) navigate("/login");
  }, [dispatch, navigate, user]);

  return (
    <div className="flex">
      <div className="flex-col">
        <div
          className={`${
            openNav ? "w-72" : "w-20"
          } duration-300 bg-prime h-full relative py-6 px-3`}
        >
          <img
            src={controlKey}
            alt="left-arrow"
            className={`absolute cursor-pointer -right-3 top-9 w-7 border-2 border-prime rounded-full bg-ter p-2 ${
              !openNav && "rotate-180"
            }`}
            onClick={() => setOpenNav(!openNav)}
          />
          <div className="flex gap-x-6 items-center">
            <img
              src={userLogo}
              alt="User Logo"
              className="w-12 rounded-2xl bg-ter p-1 border-sec border-4"
            />
            <h1
              className={`font-mont font-extrabold text-acsent text-xl origin-left duration-300 ${
                !openNav && "hidden"
              }`}
            >
              {user && user.fullName} ({user && user.role})
            </h1>
          </div>
          <div className={`my-48 ${!openNav && ""}`}>
            <NavLink className={navLink} to="/">
              <FaThLarge style={iconStyle} />
              <span
                className={`${!openNav && "hidden"} origin-left duration-200`}
              >
                Dashboard
              </span>
            </NavLink>

            <NavLink className={navLink} to="category">
              <FaList style={iconStyle} />
              <span
                className={`${!openNav && "hidden"} origin-left duration-200`}
              >
                Category
              </span>
            </NavLink>

            <NavLink className={navLink} to="products">
              <FaPrescriptionBottleAlt style={iconStyle} />
              <span
                className={`${!openNav && "hidden"} origin-left duration-200`}
              >
                Products
              </span>
            </NavLink>

            <NavLink className={navLink} to="inventory">
              <FaBox style={iconStyle} />
              <span
                className={`${!openNav && "hidden"} origin-left duration-200`}
              >
                Inventory
              </span>
            </NavLink>

            <NavLink className={navLink} to="pos">
              <FaCoins style={iconStyle} />
              <span
                className={`${!openNav && "hidden"} origin-left duration-200`}
              >
                Sales
              </span>
            </NavLink>

            <NavLink className={navLink} to="expired">
              <FaExclamationTriangle style={iconStyle} />
              <span
                className={`${!openNav && "hidden"} origin-left duration-200`}
              >
                Expiry List
              </span>
            </NavLink>

            <NavLink className={navLink} to="manage">
              <FaUsers style={iconStyle} />
              <span
                className={`${!openNav && "hidden"} origin-left duration-200`}
              >
                Manage Users
              </span>
            </NavLink>
          </div>
          <div className="pt-5 text-ter">
            <button
              onClick={handleOut}
              className=" flex items-center justify-center w-full gap-x-1 text-lg font-bold border border-sec py-1 hover:bg-sec rounded"
            >
              <BiLogOutCircle style={{fontSize: "1.5rem"}} />
              <span
                className={`${!openNav && "hidden"} origin-left duration-200`}
              >
                Logout
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="p-8 font-bold text-2xl flex-1 h-full">
        <h1 className="font-lob text-prime text-center text-3xl mb-4">
          Corisoto's Pharma
        </h1>
        <Outlet />
      </div>
    </div>
  );
}
