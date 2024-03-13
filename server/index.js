const express = require("express");
const mongoose = require('mongoose');
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors({
    origin:"http://localhost:3000",
}))
app.get("/api",(req,res)=>{
    res.json({"users":["userOne","userTwo","userThree"]})
})

mongoose
  .connect(
    'mongodb+srv://mongr:yw46DNwYWt4@cluster0.htcqlu9.mongodb.net/budgetTracker?retryWrites=true&w=majority'
  )
  .then(result => {
    console.log("MongoDB database connection established successfully");
  })
  .catch(err => {
    console.log(err);
  });
app.listen(5000,()=>{console.log("Server started on port 5000")})