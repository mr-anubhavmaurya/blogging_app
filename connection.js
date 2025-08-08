const mongoose = require("mongoose");

const URL = process.env.mongodb_URL;

mongoose.connect(URL);

const db = mongoose.connection;
db.on("connected", ()=>{
    console.log("DB connected");
})
db.on("disconnected",()=>{
    console.log("DB disconnected")
})
db.on("error", (error)=>{
    console.log("DB error", error);
})

module.exports = db;