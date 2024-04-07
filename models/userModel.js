const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  addressLine1: {
    type: String,
    required: true
  },
  addressLine2: {
    type: String,
    required: false // Assuming this field is optional
  },
  contact: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  }
});

// Static signup method
userSchema.statics.add = async function(email, password, firstName, lastName, addressLine1, addressLine2, contact, role) {
  // Validation
  if (!email || !password || !firstName || !lastName || !addressLine1 || !contact || !role) {
    throw new Error('All fields must be filled');
  }

  if (!validator.isEmail(email)) {
    throw new Error('Email is not valid');
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error('Password is not strong enough');
  }

  // Check if email already exists
  const exists = await this.findOne({ email });
  if (exists) {
    throw new Error('Email already in use');
  }

  // Password encryption
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash, firstName, lastName, addressLine1, addressLine2, contact, role });
  return user;
};
// Static login method
userSchema.statics.login = async function(email, password) {
  // Validation
  if (!email || !password) {
    throw new Error('All fields must be filled');
  }

  // Check if user exists
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error('Incorrect email or password');
  }

  // Check password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error('Incorrect email or password');
  }

  return user;
};

module.exports = mongoose.model('User', userSchema);
