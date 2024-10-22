const jwt = require("jsonwebtoken");
const User = require("../Models/user");

const authMiddlware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token)
      return res
        .status(401)
        .send({ message: "Access denied. No token Provided" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = authMiddlware;
