var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
  organizationName: {type: String, default: ""},
  password : String,
  firstName: {type: String, default: ""},
  lastName : {type: String, default: ""},
  username : String,
  province: {type: String, default: ""},
  city: {type: String, default: ""},
  barangay: {type: String, default: ""},
  street: { type: String, default: ""},
  type: {type: String, default: "customer"}
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);
