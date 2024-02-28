const { Schema, model } = require("mongoose");

// Schema for what makes up a user
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Please enter username"],
    trimmed: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please enter email address"],
    match: [
      /^([A-Za-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
      "Please enter a valid email address",
    ],
  },
  thoughts: [{ type: Schema.Types.ObjectId, ref: "thought" }],
  friends: [{ type: Schema.Types.ObjectId, ref: "user" }],
});

// Initialize the User model
const User = model("user", userSchema);

module.exports = User;
