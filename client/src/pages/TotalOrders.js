import {FaCaretRight} from "react-icons/fa";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {useEffect} from "react";
import {getSalesToday} from "../features/userSlice";
import TotalOrdersTable from "../components/TotalOrdersTable";

export default function TotalOrders() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) navigate("/login");
    dispatch(getSalesToday());
  }, [(dispatch, navigate)]);

  const {user, salesHistoryToday} = useSelector((state) => state.user);

  console.log(salesHistoryToday);

  return (
    <div>
      <h1 className="font-mont flex items-center">
        <Link className="hover:underline" to="/">
          Dashboard
        </Link>{" "}
        <span>
          <FaCaretRight />
        </span>
        Total Orders
      </h1>
      <TotalOrdersTable data={salesHistoryToday} />
    </div>
  );
}
