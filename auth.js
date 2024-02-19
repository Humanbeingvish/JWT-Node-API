const express =require('express')
const router= express.Router()
const{check, validationResult }=require('express-validator')
router.use(express.json())
const{users}=require('../db')
const bcrypt = require('bcrypt')
const JWT =require('jsonwebtoken')



//creates a new user ..


router.post('/signup', [
    check('email',"please provide a vaild email").isEmail(),
    check('password',"Enter a Valid Password with greater there 6 characters").isLength({
        min:6
    })
], async (req,res)=>{
    const {password,email} = req.body;

    //Validates the Input
    const errors =validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()
        })
    }
    //Validate if user doesnt already exist
    
    let user =users.find((user)=>{
        return user.email === email
    });
    if(user){
        return res.status(400).json({
           'errors': [
              {
               "msg":"This user already exists", 
              }
           ] 
        })
    }
//Hashing the user password 

    const  hashedPassword =await bcrypt.hash(password,10)
    users.push({
        email,
        password:hashedPassword
    })
    const token = await JWT.sign({

    },"fnniojoij4s21sxadwd7x4zx1wda2",{
        expiresIn:3600000
    })

    res.json({
        token
    })
});

//Login for the existing user  


router.post('/login',async(req,res)=>{
    const {password,email}=req.body;

    let user = users.find((user)=>{
        return user.email === email
    });
    if(!user){
        return res.status(400).json({
           'errors': [
              {
               "msg":"Invalid credentials", 
              }
           ] 
        })
    };

    let isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
        return res.status(400).json({
           'errors': [
              {
               "msg":"Invalid credentials", 
              }
           ] 
        })
    };
    
    const token = await JWT.sign({

    },"fnniojoij4s21sxadwd7x4zx1wda2",{
        expiresIn:3600000
    })

    res.json({
        token
    })


})

router.get('/all',(req,res)=>{
      res.json({users})
})


module.exports= router;






