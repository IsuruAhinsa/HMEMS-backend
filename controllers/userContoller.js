const User = require('../models/userModel')
const jwt =require('jsonwebtoken')//create token firstly insatll the npm installwebtoken library
const mongoose = require('mongoose')
//------------------create webtoken--------------------------

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })//expiresIn this one is to when not log in the 3dyas to the web it automatically sign out because token expire in 3 days
}


// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const {_id,role} = await User.login(email, password)

    // create a token
    const token = createToken(_id)
    

    res.status(200).json({email, token,role})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// adduser a user
const addUser = async (req, res) => {
  const {email, password,firstName,lastName,addressLine1,addressLine2,contact,role} = req.body

  try {
    const user = await User.add(email, password,firstName,lastName,addressLine1,addressLine2,contact,role)

    // create a token
    const token = createToken(user._id)


    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }


}
// get all users
const getUser = async (req, res) => {
  try {
    // Assuming req.user is populated with authenticated user information
    //const user_id = req.user._id;
    
    // Find all users, sorted by createdAt
    const allUsers = await User.find({}).sort({ createdAt: -1 });

    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//update users

const updateUser = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such user'})
  }

  const update = await User.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!update) {
    return res.status(400).json({error: 'No such user'})
  }

  res.status(200).json(update)
}

//delete user
const deleteUser = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such user'})
  }

  const dropUser = await User.findOneAndDelete({_id: id})

  if(!dropUser) {
    return res.status(400).json({error: 'No such user'})
  }

  res.status(200).json(dropUser)
}


module.exports = { addUser, loginUser, getUser,updateUser,deleteUser }
