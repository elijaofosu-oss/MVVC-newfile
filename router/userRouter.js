const express = require('express');
const router = express.Router();

const {allUser,newUser,getOneUser,updateUser,deleteUser} = require('../controller/user.js');
const  logger = require('../middlesware/logger.js');


router.get('/allUser', allUser)
router.get('/getoneuser/:id',getOneUser)
router.post('/createuser',newUser)
router.patch('/updateuser/:id', updateUser)
router.delete('/deleteuser/:id', deleteUser)

module.exports = router