const mongoose = require("mongoose");
const validator = require("validator");
const { default: isEmail } = require("validator/lib/isemail");

const AddUserCollection = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    maxlength: 50,
  },
  email: {
    type: String,
    require: true,
    maxlength: 50,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  phone: {
    type: Number,
    min: 10,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    maxlength: 50,
  },
});

const AddUserModule = mongoose.model("User", AddUserCollection);

module.exports = AddUserModule;
