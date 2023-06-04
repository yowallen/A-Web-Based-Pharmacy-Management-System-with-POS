const User = require("../models/userModel");
const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const Sales = require("../models/salesModel");
const uniqid = require("uniqid");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const addUser = asyncHandler(async (req, res) => {
  const {fullName, userName, password, role} = req.body;

  if (!userName || !password || !role) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  //check if user already exists
  const existingUser = await User.findOne({userName});

  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create new user
  const user = await User.create({
    fullName,
    userName,
    password: hashedPassword,
    role,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      userName: user.userName,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const {fullName, userName, password, role} = req.body;
  const {id} = req.params;

  // Check if user exists
  const user = await User.findById(id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Check if username already exists for another user
  const existingUser = await User.findOne({userName});

  if (existingUser && existingUser._id.toString() !== id) {
    res.status(409);
    throw new Error("Username already exists");
  }

  // Update user information
  user.fullName = fullName;
  user.userName = userName;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
  }
  user.role = role;

  // Save updated user information to the database
  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    fullName: updatedUser.fullName,
    userName: updatedUser.userName,
    role: updatedUser.role,
    token: generateToken(updatedUser._id),
  });
});

const userLogin = asyncHandler(async (req, res) => {
  const {userName, password} = req.body;

  if (!userName || !password) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  const user = await User.findOne({userName});

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200);
    res.json({
      _id: user._id,
      fullName: user.fullName,
      userName: user.userName,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid username or password");
  }
});

const getUser = asyncHandler(async (req, res) => {
  const {_id, username, role, fullName} = req.user;

  res.status(200).json({
    _id,
    fullName,
    username,
    role,
  });
});

const addProduct = asyncHandler(async (req, res) => {
  const {
    productName,
    category,
    productType,
    measurement,
    quantity,
    price,
    description,
    expiryDate,
    prescriptionRequired,
    productLimit,
    cost,
  } = req.body;

  if (
    !productName ||
    !category ||
    !productType ||
    !measurement ||
    !quantity ||
    !price ||
    !expiryDate
  ) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  // //check if product already exists
  // Check if product already exists and is not expired
  const productExist = await Product.findOne({
    productName,
    expiryDate: {$gt: new Date()},
  });

  if (productExist) {
    res.status(400);
    throw new Error("Product already exists and is not yet expired");
  }

  //create new product
  const product = await Product.create({
    productName,
    category,
    productType,
    measurement,
    quantity,
    price,
    description,
    expiryDate,
    prescriptionRequired,
    stockedIn: quantity,
    stockedAvailable: quantity,
    isExpired: false,
    productLimit,
    cost,
  });
  if (product) {
    res.status(201).json({
      _id: product._id,
      productName: product.productName,
      category: product.category,
      productType: product.productType,
      measurement: product.measurement,
      quantity: product.quantity,
      price: product.price,
      description: product.description,
      expiryDate: product.expiryDate,
      prescriptionRequired: product.prescriptionRequired,
      isExpired: product.isExpired,
      stockedIn: product.stockedIn,
      stockedAvailable: product.stockedAvailable,
      productLimit: product.productLimit,
      cost: product.cost,
    });
  } else {
    res.status(400);
    throw new Error("Invalid product data");
  }
});

const addCategory = asyncHandler(async (req, res) => {
  const {categoryName, categoryDescription} = req.body;
  try {
    if (!categoryName || !categoryDescription) {
      res.status(400);
      throw new Error("Please fill all fields");
    }

    //check if category already exists
    const categoryExist = await Category.findOne({categoryName});

    if (categoryExist) {
      res.status(400);
      throw new Error("Category already exists");
    }

    //create new category
    const category = await Category.create({
      categoryName,
      categoryDescription,
    });

    if (category) {
      res.status(201).json({
        _id: category._id,
        categoryName: category.categoryName,
        categoryDescription: category.categoryDescription,
      });
    } else {
      res.status(400);
      throw new Error("Invalid category data");
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

//get categories newest first
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({}).sort({createdAt: -1});

  res.json(categories);
});

//set expired
// async function checkExpiredProducts() {
//   const currentDate = new Date();
//   const expiredProducts = await Product.find({
//     expiryDate: { $lte: currentDate },
//     isExpired: { $ne: true },
//   });

//   for (let product of expiredProducts) {
//     product.isExpired = true;
//     await product.save();
//   }

//   console.log(
//     `Checked for expired products at ${currentDate}. ${expiredProducts.length} products found and marked as expired.`
//   );
// }

const createSales = asyncHandler(async (req, res) => {
  try {
    const {sales, isDiscounted} = req.body;

    // Calculate total price for each sale and update product quantity
    const savedSales = await Promise.all(
      sales.map(async (sale) => {
        const {productId, quantity} = sale;

        // Find the product by ID
        const product = await Product.findById(productId);

        // Check if the quantity is greater than the product quantity
        if (quantity > product.quantity) {
          throw new Error(
            "Invalid sales data. Quantity exceeds product quantity."
          );
        }

        // Calculate the total price of the sale
        let total = product.price * quantity;

        // Calculate the total cost of the sale
        let cost = product.cost * quantity;

        const receipt = uniqid();

        // Create a new sale object
        const saleObj = new Sales({
          product: product.productName,
          quantity: quantity,
          price: product.price,
          total: total,
          soldBy: req.user.fullName,
          cost: cost,
          receipt: receipt,
        });

        // Save the sale to the database
        const savedSale = await saleObj.save();

        // Update the product quantity
        product.quantity -= quantity;
        product.stockedAvailable -= quantity;
        await product.save();

        return savedSale;
      })
    );

    // Calculate the total price of all the sales
    const totalSales = savedSales.reduce(
      (total, sale) => total + sale.total,
      0
    );

    let discountedTotal = null;
    if (isDiscounted) {
      // Apply a 20% discount to the total price
      discountedTotal = (totalSales * 0.8).toFixed(2);
    }

    // Prepare the response object
    const response = {
      sales: savedSales,
      totalSales,
      soldBy: req.user.fullName,
    };

    // Add discountedTotal field if isDiscounted is true
    if (isDiscounted) {
      response.discountedTotal = discountedTotal;
    }

    // Return the response
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({
      message: error.message,
      error: error.message,
    });
  }
});

//sales today
const getTodaySalesTotal = asyncHandler(async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sales = await Sales.aggregate([
      {
        $match: {
          createdAt: {
            $gte: today,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalSales: {
            $sum: "$total",
          },
        },
      },
    ]);

    const totalSales = sales.length > 0 ? sales[0].totalSales : 0;

    res.status(200).json(totalSales);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch today's sales total",
      error: error.message,
    });
  }
});

//count sales today
const getSalesCountToday = asyncHandler(async (req, res) => {
  try {
    //get only today's sales
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sales = await Sales.find({
      createdAt: {
        $gte: today,
      },
    });

    const count = sales.length;

    res.json(count);
  } catch (error) {
    res.status(500).json({message: "Server error", error: error.message});
  }
});

//get all products that is not expired newest first
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().sort({
    createdAt: -1,
  });
  res.json(products);
});

//get all products count that is not expired
const getProductsCount = asyncHandler(async (req, res) => {
  const products = await Product.find();
  const count = products.length;
  res.json(count);
});

//get all expired products
const getExpiredProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({isExpired: true}).sort({
    createdAt: -1,
  });
  res.json(products);
});

//get all sales newest first
const getSales = asyncHandler(async (req, res) => {
  const sales = await Sales.find({}).sort({createdAt: -1});
  res.json(sales);
});

const getSalesToday = asyncHandler(async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sales = await Sales.find({
    createdAt: {
      $gte: today,
    },
  }).sort({createdAt: -1});

  res.json(sales);
});

const getCostToday = asyncHandler(async (req, res) => {
  //get only today's costing
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sales = await Sales.find({
    cost: {
      $gte: today,
    },
  }).sort({createdAt: -1});

  res.json(sales);
});

//get the sales by month
const getTotalSalesByMonth = asyncHandler(async (req, res) => {
  const months = [
    {
      month: "January",
      sales: 0,
      cost: 0,
    },
    {
      month: "February",
      sales: 0,
      cost: 0,
    },
    {
      month: "March",
      sales: 0,
      cost: 0,
    },
    {
      month: "April",
      sales: 0,
      cost: 0,
    },
    {
      month: "May",
      sales: 0,
      cost: 0,
    },
    {
      month: "June",
      sales: 0,
      cost: 0,
    },
    {
      month: "July",
      sales: 0,
      cost: 0,
    },
    {
      month: "August",
      sales: 0,
      cost: 0,
    },
    {
      month: "September",
      sales: 0,
      cost: 0,
    },
    {
      month: "October",
      sales: 0,
      cost: 0,
    },
    {
      month: "November",
      sales: 0,
      cost: 0,
    },
    {
      month: "December",
      sales: 0,
      cost: 0,
    },
  ];

  const sales = await Sales.aggregate([
    {
      $group: {
        _id: {
          month: {$month: "$createdAt"},
        },
        totalSales: {
          $sum: "$total",
        },
        totalCost: {
          $sum: "$cost",
        },
      },
    },
  ]);

  sales.forEach((sale) => {
    const monthIndex = sale._id.month - 1;
    months[monthIndex].sales = sale.totalSales;
    months[monthIndex].cost = sale.totalCost;
  });

  res.json(months);
});

//get the top product by month
const getTopProductsByMonth = asyncHandler(async (req, res) => {
  const months = [
    {
      month: "January",
      topProduct: "",
      sales: 0,
    },
    {
      month: "February",
      topProduct: "",
      sales: 0,
    },
    {
      month: "March",
      topProduct: "",
      sales: 0,
    },
    {
      month: "April",
      topProduct: "",
      sales: 0,
    },
    {
      month: "May",
      topProduct: "",
      sales: 0,
    },
    {
      month: "June",
      topProduct: "",
      sales: 0,
    },
    {
      month: "July",
      topProduct: "",
      sales: 0,
    },
    {
      month: "August",
      topProduct: "",
      sales: 0,
    },
    {
      month: "September",
      topProduct: "",
      sales: 0,
    },
    {
      month: "October",
      topProduct: "",
      sales: 0,
    },
    {
      month: "November",
      topProduct: "",
      sales: 0,
    },
    {
      month: "December",
      topProduct: "",
      sales: 0,
    },
  ];

  const sales = await Sales.aggregate([
    {
      $group: {
        _id: {
          month: {$month: "$createdAt"},
          product: "$product",
        },
        totalSales: {
          $sum: "$total",
        },
      },
    },
  ]);

  sales.forEach((sale) => {
    const month = sale._id.month - 1;
    if (sale.totalSales > months[month].sales) {
      months[month].sales = sale.totalSales;
      months[month].topProduct = sale._id.product;
    }
  });

  res.json(months);
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).sort({createdAt: -1});
  res.json(users);
});

const updateCategory = asyncHandler(async (req, res) => {
  const categoryData = req.body;
  const {id} = req.params;

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      {
        categoryName: categoryData.categoryName,
        categoryDescription: categoryData.categoryDescription,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400);
    throw new Error("Failed to update category");
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  const {id} = req.params;
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    res.status(200).json(deletedCategory);
  } catch (error) {
    res.status(400);
    throw new Error("Failed to delete category");
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const productData = req.body;
  const {id} = req.params;

  const existingProduct = await Product.findById(id);
  const updatedQuantity =
    existingProduct.quantity + parseInt(productData.quantity, 10);

  try {
    const updateProduct = await Product.findByIdAndUpdate(
      id,
      {
        productName: productData.productName,
        category: productData.category,
        productType: productData.productType,
        measurement: productData.measurement,
        quantity: updatedQuantity,
        price: productData.price,
        description: productData.description,
        expiryDate: productData.expiryDate,
        productLimit: productData.productLimit,
        prescriptionRequired: productData.prescriptionRequired,
        stockedIn:
          productData.quantity > 0
            ? parseInt(productData.quantity, 10) +
              parseInt(existingProduct.stockedIn, 10)
            : productData.stockedIn,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updateProduct);
  } catch (error) {
    res.status(400);
    throw new Error("Failed to update product");
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const {id} = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(400);
    throw new Error("Failed to delete product");
  }
});

//get products that have a low quantity
const getLowQuantityProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({
    $expr: {
      $lte: ["$quantity", "$productLimit"],
    },
  }).sort({createdAt: -1});

  res.json(products);
});

const getAlmostExpired = asyncHandler(async (req, res) => {
  const currentDate = new Date();
  const oneMonthFromNow = new Date();
  oneMonthFromNow.setDate(currentDate.getDate() + 30); // Set the date one month from the current date

  const products = await Product.find({
    $or: [
      {
        expiryDate: {
          $gte: currentDate, // Products that have not expired yet
          $lte: oneMonthFromNow, // Products expiring within one month from the current date
        },
      },
      {
        expiryDate: {
          $lt: currentDate, // Products that have already expired
        },
      },
    ],
  }).sort({createdAt: -1});

  res.json(products);
});

module.exports = {
  addUser,
  userLogin,
  getUser,
  updateUser,
  addProduct,
  addCategory,
  // checkExpiredProducts,
  createSales,
  getProducts,
  getExpiredProducts,
  getTodaySalesTotal,
  getSalesCountToday,
  getCostToday,
  getSales,
  getProductsCount,
  getCategories,
  getSalesToday,
  getTotalSalesByMonth,
  getAllUsers,
  updateCategory,
  deleteCategory,
  updateProduct,
  deleteProduct,
  getTopProductsByMonth,
  getLowQuantityProducts,
  getAlmostExpired,
};
