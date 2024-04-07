const express = require('express')

// controller functions
const { loginUser, addUser,getUser ,updateUser,deleteUser} = require('../controllers/userContoller')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/addUser', addUser)

//get users
router.get('/', getUser)


//update user
router.patch('/:id', updateUser)

//delete user
router.delete('/:id', deleteUser)

module.exports = router
