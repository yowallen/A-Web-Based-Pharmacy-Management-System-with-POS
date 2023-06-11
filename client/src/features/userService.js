import axios from "axios";

const API_URL = axios.create({
  baseURL: "https://corisoto-pharm.onrender.com/api/user",
});

API_URL.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user")).token
    }`;
  }
  return req;
});

//user
const getUser = () => API_URL.get("/getuser");
const addUser = (userData) => API_URL.post("/adduser", userData);
const editUser = (id, userData) => API_URL.put(`/updateuser/${id}`, userData);
const userLogin = (userData) => API_URL.post("/login", userData);
const allUser = () => API_URL.get("/alluser");
//product
const getSales = () => API_URL.get("/getsales");
const getTodaySalesTotal = () => API_URL.get("/salestoday");
const getSalesCountToday = () => API_URL.get("/salescount");
const getSalesListToday = () => API_URL.get("/saleslisttoday");
const getCostToday = () => API_URL.get("/costtoday");
const getCategories = () => API_URL.get("/getcategory");
const productCount = () => API_URL.get("/productcount");
const getProduct = () => API_URL.get("/getproduct");
const getExpired = () => API_URL.get("/expiredproducts");
const getMonthSales = () => API_URL.get("/monthsales");
const topProducts = () => API_URL.get("/topproducts");
const lowProducts = () => API_URL.get("/lowquantity");
const almostExpired = () => API_URL.get("/getalmostexpired");
const getType = () => API_URL.get("/gettype");
const getMes = () => API_URL.get("/getmes");
const getBrn = () => API_URL.get("/getbrn");

const addProduct = (productData) => API_URL.post("/addproduct", productData);
const createSales = (payload) => API_URL.post("/createsales", payload);
const addCategory = (categoryData) =>
  API_URL.post("/addcategory", categoryData);

//put update
const updatedCategory = (id, updatedCategory) =>
  API_URL.put(`/updatecategory/${id}`, updatedCategory);

const updateProduct = (id, updatedProduct) =>
  API_URL.put(`/updateproduct/${id}`, updatedProduct);

//del
const deleteCategory = (id) => API_URL.delete(`/deletecategory/${id}`);
const deleteProduct = (id) => API_URL.delete(`/deleteproduct/${id}`);

const userAPI = {
  getUser,
  addUser,
  editUser,
  userLogin,
  getSales,
  getTodaySalesTotal,
  getSalesCountToday,
  addProduct,
  createSales,
  addCategory,
  productCount,
  getCategories,
  getProduct,
  getSalesListToday,
  getCostToday,
  getExpired,
  getMonthSales,
  allUser,
  updatedCategory,
  deleteCategory,
  updateProduct,
  deleteProduct,
  topProducts,
  lowProducts,
  almostExpired,
  getType,
  getMes,
  getBrn,
};

export default userAPI;
