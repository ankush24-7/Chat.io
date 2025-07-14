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
const verifyJWT = require("./middlewares/verifyJWT");

connectDB();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);
app.use(cors(corsOptions));

app.use("/api/auth", require("./routes/authRoutes"));

app.use(verifyJWT);

app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/message", require("./routes/messageRoutes"));

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});
