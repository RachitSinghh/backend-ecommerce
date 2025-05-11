//  this file contains the JWT middleware and rolebased access logic
//
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log("Received Token:", token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decoded);

      req.user = await User.findByPk(decoded.id);

      if (!req.user) {
        console.log("User not found with this token");
        return res.status(401).json({ message: "User not found" });
      }

      console.log("User authenticated:", req.user.email);
      next();
    } catch (err) {
      console.error("Token verification failed:", err);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    console.log("No token provided");
    res.status(401).json({ message: "Not authorized, no token" });
  }
};
// only allow admins to access these routes

exports.adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }

  res.status(403).json({ msg: "Access denided, admin only" });
};
