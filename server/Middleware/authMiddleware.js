const jwt = require("jsonwebtoken");
const Seller = require("../Database/Models/Seller");

console.log("JWT Secret:", process.env.JWT_SECRET); 

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log("Token received:", token); 
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded payload:", decoded); 

      req.user = await Seller.findById(decoded.userId).select("-password");
      console.log("User found in DB:", req.user);


      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();
    } catch (error) {
      console.error("JWT Verification Error:", error);
      return res.status(401).json({ message: "Token verification failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
};

module.exports = { protect };