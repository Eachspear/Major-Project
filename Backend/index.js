require('dotenv').config();
const express=require("express");
const app=express();
const route=require("./routes/user")
const locationRoutes=require("./routes/locationRoutes");
const mongoose=require("mongoose");
const cors=require("cors");
const port=8500;

mongoose.connect("mongodb://localhost:27017/InstaHang_Users").then(()=>{
    console.log("Database Connected");
});
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use("/user",route);
app.use("/location",locationRoutes);
app.get("/",(req,res)=>{
    return res.end("HOMEPAGE");
})
app.listen(port,()=>{
    console.log(`Server Started at ${port}`);
})

