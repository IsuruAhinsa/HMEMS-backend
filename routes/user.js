const express = require('express')

// controller functions
const { loginUser, addUser,getUser } = require('../controllers/userContoller')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/addUser', addUser)

//get users
router.get('/', getUser)

module.exports = router
