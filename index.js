const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const PORT = process.env.PORT;
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog")
const db = require("./connection");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { checkAuthenticationCookie } = require("./middlewares/authentication");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(checkAuthenticationCookie("token"));
// app.use((err,req,res,next)=>{
//   console.log(err);
//   res.status(500).send("something broke!")
// })

app.get("/", (req, res) => {
  res.render("home", {
    user: req.user,
  });
});
// routes
app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => {
  console.log(`server running at:- http://localhost:${PORT}`);
});
