const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const PORT = process.env.PORT;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//imports
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const db = require("./connection");
const { checkAuthenticationCookie } = require("./middlewares/authentication");
const Blog = require("./models/blog");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(checkAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({}).sort({ createdAt: -1 });
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

// routes
app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => {
  console.log(`server running at:- http://localhost:${PORT}`);
});
