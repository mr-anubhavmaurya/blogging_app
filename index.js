const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path")
const PORT = process.env.PORT;
const userRoute = require("./routes/user")
const db = require("./connection")
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middleware
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get("/", (req,res)=>{
    res.render("home");
})
// routes
app.use("/user", userRoute);

app.listen(PORT,()=>{
    console.log(`server running at:- http://localhost:${PORT}`)
} )