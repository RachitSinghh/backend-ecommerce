//  this file contains the JWT middleware and rolebased access logic

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

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findByPk(decoded.id);

      if (!req.user) return res.status(401).json({ message: "User not found" });

      next();
    } catch (err) {
      console.error(err);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).josn({ message: "Not authorized, no token" });
  }
};


// only allow admins to access these routes

exports.adminOnly = (req, res, next ) =>{
  if(req.user && req.user.role === 'admin'){
    return next();
  }

  res.status(403).json({ msg: 'Access denided, admin only'});
}