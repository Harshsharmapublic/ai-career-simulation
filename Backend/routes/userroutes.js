const express=require('express');
const router=express.Router();
const {user} =require('../config/controller/usercontroller');
router.post("/user", user);
module.exports=router; 