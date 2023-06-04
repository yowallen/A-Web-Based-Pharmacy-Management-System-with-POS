const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

// @route   api/user
router.get("/getuser", protect, userController.getUser);
router.get("/alluser", userController.getAllUsers);
router.post("/adduser", userController.addUser);
router.post("/login", userController.userLogin);
router.put("/updateuser/:id", userController.updateUser);

// @route    api/user/product
router.get("/getsales", userController.getSales);
router.get("/salestoday", userController.getTodaySalesTotal);
router.get("/salescount", userController.getSalesCountToday);
router.get("/saleslisttoday", userController.getSalesToday);
router.get("/monthsales", userController.getTotalSalesByMonth);
router.get("/expiredproducts", userController.getExpiredProducts);
router.get("/productcount", userController.getProductsCount);
router.get("/getcategory", userController.getCategories);
router.get("/getproduct", userController.getProducts);
router.get("/topproducts", userController.getTopProductsByMonth);
router.get("/getalmostexpired", userController.getAlmostExpired);
router.get("/lowquantity", userController.getLowQuantityProducts);
router.get("/costtoday", userController.getCostToday);
router.post("/addproduct", userController.addProduct);
router.post("/createsales", protect, userController.createSales);
router.post("/addcategory", userController.addCategory);
router.put("/updatecategory/:id", userController.updateCategory);
router.delete("/deletecategory/:id", userController.deleteCategory);
router.delete("/deleteproduct/:id", userController.deleteProduct);
router.put("/updateproduct/:id", userController.updateProduct);

module.exports = router;
