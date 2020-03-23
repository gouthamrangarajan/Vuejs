var express = require('express')
var router = express.Router()
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const jwtSign='NUXT_AUTH_101';

//prepopulated users pwd is same as email
const usersData=require('./usersData')
const users=usersData.data

//called by nuxt auth
router.post('/login',(req,res)=>{
  if(!req.body || !req.body.email || !req.body.password){
    res.status('400').json({msg:'Bad request'});
    return;
  }
 let user=users.filter(el=>el.email.toLowerCase()==req.body.email.trim().toLowerCase())[0];
 if(!user){
    res.status('401').json({msg:'Invalid credentials'});
    return;
 }

  bcrypt.compare(req.body.password, user.pwd, function(err, result) {
    if(result == true){
      user.currToken = jwt.sign({ name:user.name,email:user.email }, jwtSign);
      res.status(200).json({token:user.currToken});
      return;
    }
    else{
        res.status('401').json({msg:'Invalid credentials'});
        return;
    }
  });
})

//called by nuxt auth
router.get('/user',(req,res)=>{
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
      res.status('200').json({user:{name:user.name,email:user.email}});
      return;
    }
    else{
      res.status('401').json({msg:'Not authorized'});
      return;
    }
  });
})

//called by nuxt auth
router.post('/logout',(req,res)=>{
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
      user.currToken='';
      res.status('200').json({msg:'succesfully logged out'});
      return;
    }
    else{
      res.status('401').json({msg:'Not authorized'});
      return;
    }
  });
})


module.exports = router
