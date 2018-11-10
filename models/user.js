var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
  password : String,
  avatar   : String,
  firstName: String,
  lastName : String,
  username    : String,
  province: String,
  city: String,
  barangay: String,
  street: { type: String, default: ""},
  type: {type: String, default: "customer"}
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);
