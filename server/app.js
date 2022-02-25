const cookieParser = require('cookie-parser');
const dotenv = require('dotenv')
// const mongoose = require("mongoose");
const express = require("express");
const app = express();
// const cors = require("cors");

dotenv.config({path:'./config.env'})
require('./db/conn')

app.use(express.json());

app.use(cookieParser())


// app.use(
//   cors({
//     origin: "http://localhost:3000",
//   })
// )

// const User = require('./model/userSchema')

const PORT = process.env.PORT;

// Middleware

// function middleware(req, res, next) {
//   console.log("Hello middleware");
//   return next();
// }

app.use(require('./router/auth'));

// middleware();

// app.get("/", (req, res) => {
//   res.send("Hello");
// });
// app.get("/about",middleware, (req, res) => {
//   res.send("Hello from About");
// });
app.get("/contact", (req, res) => {
  res.send("Hello from Contact");
});
app.get("/signin", (req, res) => {
  res.send("Hello Login");
});

app.get("/signup", (req, res) => {
  res.send("Hello Register");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

// connection();