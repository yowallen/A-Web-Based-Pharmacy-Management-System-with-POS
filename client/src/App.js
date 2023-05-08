import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login";
import Root from "./layouts/Root";
import ManageUsers from "./pages/ManageUsers";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Inventory from "./pages/Inventory";
import Expired from "./pages/Expired";
import Sales from "./pages/Sales";
import Dashboard from "./pages/Dashboard";
import TotalOrders from "./pages/TotalOrders";
import PointOfSale from "./pages/PointOfSale";
import History from "./pages/History";

import { Toaster } from "react-hot-toast";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route to="/" element={<Root />}>
          <Route index element={<Dashboard />} />
          <Route path="sales" element={<Sales />} />
          <Route path="orders" element={<TotalOrders />} />
          <Route path="products" element={<Products />} />
          <Route path="category" element={<Categories />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="expired" element={<Expired />} />
          <Route path="manage" element={<ManageUsers />} />
          <Route path="pos" element={<PointOfSale />} />
          <Route path="history" element={<History />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Route>
    )
  );

  return (
    <div>
      <Toaster />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
