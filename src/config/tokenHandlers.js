const jwt = require('jsonwebtoken');
const { Users } = require('../models');

const tokenDecode = (req) => {
   const bearerHeader = req.headers.authorization ? req.headers.authorization : req.query.token
   if (bearerHeader) {
      if(bearerHeader.split(' ')[1]) {
         const bearer = bearerHeader.split(' ')[1];
         try {
            const tokenDecoded = jwt.verify(
               bearer, 
               process.env.SECRET_KEY
            );
            return tokenDecoded;
         } catch (err) {
            return false
         }
      } else {
         try {
            const bearer = req.query.token
            const tokenDecoded = jwt.verify(
               bearer, 
               process.env.SECRET_KEY
            );
            return tokenDecoded
         } catch (err) {
            return false
         }
      }
   } else {
      return false;
   }
}

exports.verifyToken = async (req, res, next) => {
   const tokenDecoded = tokenDecode(req);
   if(tokenDecoded) {
      const users = await Users.findById(tokenDecoded.id);
      if(!users) return res.status(403).json({ message: 'No allowed' })
      req.users = users;
      next();
   } else {
      res.status(401).json({
         message: 'Unauthorized'
      })
   }
}