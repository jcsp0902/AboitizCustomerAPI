var express  = require("express"),
    router   = express.Router(),
    User     = require('../models/user');


router.get("/user", function(req, res, next){
  User.findById(req.params.id, function(err, user){
    if(err) {
      return res.send({
        status: "error",
        message: "failed to get user info",
      })
    }
    return res.send({
      status: "success",
      message: "Successfully get user info",
      user,
    })
  })
})

router.get("/users", function(req, res, next){
  User.find({}, function(err, users){
    if(err) {
      return res.send({
        status: "error",
        message: "failed to get all user info"
      })
    }
    return res.send({
      status: "success",
      message: "Successfully get all user info",
      users,
    })
  })
})

module.exports = router;