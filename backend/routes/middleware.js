const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const authMiddleware = (req,res,next) => {
  let header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer")) {

    return res.status(403).json({});
  }
  const token = header.split(" ")[1];

  try {
    const decode = jwt.verify(token, JWT_SECRET);
    req.userId = decode.userId;
    next();
  } catch (err) {

    return res.status(403).json({});
  }


}

 

module.exports = {
  authMiddleware,
};
