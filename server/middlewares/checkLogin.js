const jwt = require('jsonwebtoken');
let userid = null;
const checkLogin = (req,res,next) =>{

   const{authorization} = req.headers;
   try{
    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token,'rs8Hjjs&hbsg56');
    userid = decoded.userId;
    req.userId = userid; 
    next();
   }catch{
    next('Authentication Failed!');
   }
   
};
module.exports = checkLogin;