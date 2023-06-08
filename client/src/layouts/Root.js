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
import {RiAlarmWarningLine} from "react-icons/ri";
import {IoWarningOutline} from "react-icons/io5";

export default function Root() {
  const [openNav, setOpenNav] = useState(true);
  const navLink = `flex items-center font-pop text-acsent py-3 hover:bg-sec hover:text-prime px-2 gap-x-4 rounded-md ${
    !openNav && "justify-center"
  }`;
  const iconStyle = {fontSize: "24px"};
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user, lowProduct, almostExpired} = useSelector((state) => state.user);

  const handleOut = () => {
    dispatch(userLogout());
    window.location.reload();
  };

  useEffect(() => {
    if (!user) navigate("/login");
  }, [dispatch, navigate, user]);

  useEffect(() => {
    // Save the lowProduct to localStorage whenever it changes
    localStorage.setItem("lowProduct", JSON.stringify(lowProduct));
    localStorage.setItem("almostExpired", JSON.stringify(almostExpired));
  }, [lowProduct, almostExpired]);

  const low = JSON.parse(localStorage.getItem("lowProduct"));
  const exp = JSON.parse(localStorage.getItem("almostExpired"));

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
                Manage Products
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
        <div className="flex items-center w-full mb-4">
          <h1 className="font-lob text-prime text-3xl">Corisoto's Pharmacy</h1>
          <div className=" ml-72 flex gap-x-2">
            <button
              disabled={low.length === 0}
              onClick={() => navigate("/low")}
              className={`bg-${
                low.length === 0 ? "gray-600" : "prime hover:bg-sec"
              } p-2 rounded-md text-sm text-ter flex items-center gap-x-2`}
            >
              <IoWarningOutline /> Low on Stocks:
              <span
                className={`ml-2 text-base bg-${
                  low.length === 0 ? "gray-300" : "red-500"
                } rounded-full w-6 h-6 items-center justify-center inline-flex`}
              >
                {low.length}
              </span>
            </button>

            <button
              disabled={exp.length === 0}
              onClick={() => navigate("/expired")}
              className={`bg-${
                exp.length === 0 ? "gray-600" : "prime hover:bg-sec"
              } p-2 rounded-md text-sm text-ter flex items-center gap-x-2`}
            >
              <RiAlarmWarningLine /> Nearly Expired:
              <span
                className={`ml-2 text-base bg-${
                  exp.length === 0 ? "gray-300" : "red-500"
                } rounded-full w-6 h-6 items-center justify-center inline-flex`}
              >
                {exp.length}
              </span>
            </button>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
