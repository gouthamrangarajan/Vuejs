var express = require('express')
var router = express.Router()
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const jwtSign='NUXT_AUTH_101';

//prepopulated users pwd is same as email
const users=[
  {name:'user1',email:'user1@email.com',pwd:'$2b$10$OeqvXXA65x9AmQYMDgPFfuo8iM4UzUsry7reEhrdyp1NtKxeyKIxC',currToken:''},
  {name:'user2',email:'user2@email.com',pwd:'$2b$10$1x9m/DOiNK.kmjUKg9cXQOI2VklY622KC3SvoBrkcZCh.7.ydRBwa',currToken:''}
  ]

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

//called manually from ui to get all users
router.get('/users',(req,res)=>{
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
      let lclUsers=users.map(el=>{ return {name:el.name,email:el.email};});
      res.status('200').json(lclUsers);
      return;
    }
    else{
      res.status('401').json({msg:'Not authorized'});
      return;
    }
  });
})

//called manually from ui to register a user
router.post('/register',(req,res)=>{
  if(!req.headers || !req.headers.authorization){
    res.status('401').json({msg:'Invalid request'});
    return;
  }

  if(!req.body || !req.body.email || !req.body.password || !req.body.name){
    res.status('400').json({msg:['Bad request']});
    return;
  }
  let msg=[];
  if(req.body.name.trim().length<5){
    msg.push('Name should be minimum of five characters');
  }
  if(!validateEmail(req.body.email)){
    msg.push('Invalid email');
  }
  if(req.body.password.trim().length<8){
    msg.push('Password should be minimum of eight characters');
  }
  if(msg.length>0){
    res.status('400').json({msg:msg});
    return;
  }
  jwt.verify(req.headers.authorization.replace("Bearer ",""), jwtSign, function(err, decoded) {
    if(decoded) {
      let user=users.filter(el=>el.email.toLowerCase()==decoded.email.trim().toLowerCase())[0];
      if(!user || user.currToken==''){
          res.status('403').json({msg:['Invalid user']});
          return;
      }
     if(users.filter(el=>el.email.toLowerCase()==req.body.email.trim().toLowerCase()).length!=0){
        res.status('400').json({msg:['User already exist...']});
        return;
      }
     bcrypt.hash(req.body.password,10,function(err,hash){
       if(err){
          res.status('500').json({msg:['Error, try again...']});
          return;
       }
       users.push({name:req.body.name.trim(),email:req.body.email.trim(),pwd:hash,currToken:''});
       res.status('200').json({msg:['Successfully registered user']});
       return;
     })
    }
    else{
      res.status('401').json({msg:['Not authorized']});
      return;
    }
  });
})
function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
module.exports = router
