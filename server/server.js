const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const morgran = require("morgan");
const conn = require("./config/database");
const colors = require("colors");
const cron = require("node-cron");
// const checkExpiredProductsController = require("./controllers/userController");
// const expiredController = checkExpiredProductsController.checkExpiredProducts;

const { handleError } = require("./middlewares/errorHandler");

//route
const userRoute = require("./routes/userRoute");

//middleware
const app = express();

app.use(cors());
app.disable("x-powered-by"); //for sec purposes
app.use(morgran("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

app.use("/api/user", userRoute);

// Schedule the expired product checking function to run every day at midnight
// cron.schedule("0 0 * * *", () => {
//   expiredController();
// });

// cron.schedule("22 1 * * *", () => {
//   expiredController();
// });

//error handler
app.use(handleError);

conn()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
