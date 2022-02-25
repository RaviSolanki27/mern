const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;

    console.log(req.jwtoken, "req.jwtoken");

    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log("ALL token data", token, verifyToken);

    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });
    console.log("rootUser in authenticate", rootUser);
    if (!rootUser) {
      throw new Error("User not found");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;
    return next();
  } catch (err) {
    res.status(401).send("Unauthorized: No token provied");
    console.log("LAst Error in AUthenticator", err);
  }
};

module.exports = authenticate;
