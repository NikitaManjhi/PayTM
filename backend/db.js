require("dotenv").config();
const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const url = process.env.DB_URL;
mongoose.connect(url).then(() => console.log("connection done"));

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 6,
    maxLength: 20,
  },
  password: {
    type: String,
    required: true,
    minLenth: 6,
    maxLength: 100,
  },
});

const account = new Schema({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: "userSchema" ,
    required: true
  },
  balance: {
    type: Number,
    required: true
  }
});

userSchema.methods.createHash = async function (password) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
};

// validate candidates password with hashed password
userSchema.methods.validatePassword = async function (candidatepw) {
  return await bcrypt.compare(candidatepw, this.password);
};

// Create db model
const User = mongoose.model("User", userSchema);
const Account = mongoose.model("account", account);

module.exports = {
  User,
  Account
};
