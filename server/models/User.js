const { Schema, model } = require("mongoose");

const User = new Schema({
  email: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  isActive: { type: Boolean, default: true },
});
module.exports = model("User", User);
