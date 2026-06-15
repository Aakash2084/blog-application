require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT||8000;
const path = require("path");
const cookieParser = require("cookie-parser");
const Blog = require("./model/blog");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
app.use(express.static("public"));

const { mongoDbConnection } = require("./connections/connection");
const { validateUserAuthentication } = require("./middlewares/auth");

app.use(validateUserAuthentication("token"));

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const staticRoute = require("./routes/staticRoute");

mongoDbConnection(process.env.MONGO_URI);

app.use("/user", userRoute);
app.use("/blog", blogRoute);
app.use("/", staticRoute);

app.listen(PORT, () => console.log("listning at port:", PORT));
