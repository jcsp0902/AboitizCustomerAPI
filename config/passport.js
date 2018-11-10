var LocalStrategy   = require('passport-local').Strategy;
var User            = require('../models/user');
var passport 				= require('passport')

exports.isAuthenticated = function(req, req, next){
	if(req.isAuthenticated()){
		return next();
	}
	return res.send({error: "You are not allowed to access this."});
}

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });


    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
				console.log('req.body: ', req.body)
        process.nextTick(function() {

        User.findOne({ email :  email }, function(err, user) {
						if (err)
								console.log('err', err)
                return done(err);

            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {

                var newUser            = new User();

                newUser.local.email    = email;
                newUser.local.password = newUser.generateHash(password);

                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        });    

        });

    }));

};
