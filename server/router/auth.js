const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");

// const jwt = require("jsonwebtoken");

require("../db/conn");
const User = require("../model/userSchema");
const authenticate = require("../middleware/authenticate");

router.get("/", (req, res) => {
  res.send("Hello from router js");
});

// Method 1:  Using promises

// router.post("/register", (req, res) => {
//   const { name, email, phone, work, password, cpassword } = req.body;

//   if (!name || !email || !phone || !work || !password || !cpassword) {
//     return res.status(422).json({ error: "PLz enter valid detail" });
//   }

//   User.findOne({ email: email })
//     .then((userExist) => {
//       if (userExist) {
//         return res.status(422).json({ error: "Email already exist" });
//       }
//       const user = new User({ name, email, phone, work, password, cpassword });

//       user
//         .save()
//         .then(() => {
//           res.status(201).json({ message: "user registered successfully" });
//         })
//         .catch((err) => {
//           res.status(500).json({ erroe: "Failed registere" });
//         });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

/**
 * Method 2: Using Async Await      (Recommanded)
 *
 */

router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "PLz enter valid detail" });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email already exist" });
    }

    const user = new User({ name, email, phone, work, password, cpassword });

    await user.save(); // Save data

    res.status(201).json({ message: "user registered successfully" });
  } catch (error) {
    console.log(error);
  }
});

/**
 * Login route
 *
 */

router.post("/signin", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ erroe: "Please fill the data" });
    }
    const userLogin = await User.findOne({ email: email });
    console.log("User Is Logdin", userLogin);

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      token = await userLogin.generateAuthToken();
      console.log(token);

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 2592000000),
        httpOnly: true,
      });

      if (!isMatch) {
        res.status(400).json({ error: "Invalid details" });
      } else {
        res.json({ message: "user Login successfully" });
      }
    } else {
      res.status(400).json({ error: "Invalid details not login" });
    }
  } catch (error) {
    console.log(error);
  }
});

//  About Page

router.get("/about", authenticate, (req, res) => {
  try {
    console.log("req.rootUser", req.rootUser);
    res.send(req.rootUser);
  } catch (error) {
    res.status(401).send("Unauthorized: No token provied");
  }
});

// Logout page

router.get("/logout", (req, res) => {
  console.log("Logout page");
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("User logout");
});

module.exports = router;
