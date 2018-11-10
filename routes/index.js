var express = require("express"),
    router  = express.Router(),
    passport = require("passport"),
    LocalStrategy= require("passport-local").Strategy,
    middleware = require("../middleware"),
    User   = require("../models/user");
// root route



// ===========
// AUTH ROUTES
// ===========

// show register form
router.get("/register", function(req, res){
  res.render("register");
});

// handle signup logic
router.post("/register", function(req, res){
  const params = JSON.parse(Object.keys(req.body)[0]);
  console.log('params: ', params)
  var newUser = new User(params);
  User.register(newUser, params.password, function(err, user){
    if(err) {
      return res.send({
        status: "error",
        message: err.message,
        user: {},
      });
    }
    else{
      // passport.authenticate("local")(req, res, function(){
        // req.flash("success", "Welcome to Kilein's Camp Site " + user.username);
        return res.send({
          user,
          status: "success",
          message: "Successfully registered",
        });
      // });
    }
  });
});

// show login form
router.get("/login", function(req, res){
  res.render("login");
});
// router.post("/login", middleware, callback)
// ORIGINAL
router.get("/login", function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    if(err) return next(err);
    if(!user) {
      return res.send({
        status: "error",
        message: "failed to authenticate",
      })
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.send({
        status: "success",
        message: "Successfully logged in",
      });
    });
  })
});
// router.post("/login", function(req, res){
//   passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, function (err, user) {
//       if (err) { console.log('ERROR', err); return done(err); }
//       if (!user) {
//         console.log('incorrect username')
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!user.validPassword(password)) {
//         console.log('incorrect password')
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     });
//   }
// ));
// });

// logout routes
router.get("/logout", function(req,res){
  req.logout();
  res.send({
    status: "success",
    message: "Successfully logged out"
  })
});

// USERS PROFILES
// router.get("/users/:id", middleware.isLoggedIn, function(req, res){
//   User.findById(req.params.id, function(err, foundUser){
//     if(err){
//       req.flash("error", err.message);
//       res.redirect("/");
//     } else{
//       res.render("users/show", {user : foundUser});
//     }
//   });
// });

module.exports = router;
