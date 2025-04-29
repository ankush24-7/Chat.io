require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const connectDB = require("./config/dbConn");
const cookieParser = require("cookie-parser");
const logger = require("./middlewares/logger");
const corsOptions = require("./config/corsOptions");

connectDB();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);
app.use(cors(corsOptions));

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});
