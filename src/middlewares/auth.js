// This file contains the authentication logic, including register/loging routes.


const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {

  let token = req.headers.authorization; 

  if(token && token.startsWith('Bearer ')){
    token = token.split(' ')[1];
  }else{
    return res.status(401).json({msg: 'No token, authorization denied'})
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

exports.adminOnly = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ msg: "Admin access only" });
  }
  next();
};
