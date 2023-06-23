const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter an username"],
    minlength: [2, "Minimum password length is a 2 charachtars"],
  },
  email: { 
    type: String,
    required: [false, "Please enter an Email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please enter an Password"],
    minlength: [6, "Minimum password length is a 6 charachtars"],
  },
  role:{
    type: String,
    required: [true, "Please enter your role"],
    enum: ["admin", "user", "member"],
  }
 
});

/* This is a middleware that is used to hash the password before saving it to the database. */
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

/* This is a static method that is used to login a user. */
UserSchema.statics.login = async function (username, password) {
  const user = await this.findOne({
    $or: [{ email: username }, { username: username }],
  });
  console.log(user);
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Your password is incorrect");
  }
  throw Error("Your email/username is incorrect");
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
