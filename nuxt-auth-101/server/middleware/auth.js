var jwt = require('jsonwebtoken');
const jwtSign='NUXT_AUTH_101';
//prepopulated users pwd is same as email
const usersData=require('./../modals/usersData');
const users=usersData.data;
module.exports=function(){
   var verifyAuth=function(req,res,next){
      if(!req.headers || !req.headers.authorization){
        res.status('401').json({msg:'Invalid request'});
        return;
      }
      jwt.verify(req.headers.authorization.replace("Bearer ",""), jwtSign, function(err, decoded) {
        if(decoded) {
          let user=users.filter(el=>el.email.toLowerCase()==decoded.email.trim().toLowerCase())[0];
          if(!user || user.currToken==''){
              res.status('403').json({msg:'Invalid user'});
              return;
          }
          next();
        }
        else{
          res.status('401').json({msg:'Not authorized'});
          return;
        }
    });
  }
  verifyAuth.unless = require('express-unless');
  return verifyAuth;
}
