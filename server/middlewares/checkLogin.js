const jwt = require('jsonwebtoken');
let userid = null;
const checkLogin = (req,res,next) =>{
   const token = req.headers.authorization.split(' ')[1];
   console.log(token);
   if (!token) {
    return res.status(403).json({ message: 'Token is required' });
   }
   jwt.verify(token, 'rs8Hjjs&hbsg56', (err, decoded) => {
   if (err) {
      return res.status(401).json({ message: err });
   }
   userid = decoded.userId;
   req.userId = userid; 
   next();
  });
};
module.exports = checkLogin;