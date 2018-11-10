var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    flash         = require("connect-flash"),
    passport      = require("passport"),
    methodOverride = require("method-override"),
    LocalStrategy = require("passport-local"),
    cors          = require('cors')
    User          = require("./models/user"),
    morgan        = require("morgan");
    seedDB        = require("./seeds");
// requiring routes
var indexRoutes      = require("./routes/index");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/aboitizChallenge", {useMongoClient: true});
// mongoose.connect("mongodb://nicho:nicho@ds149134.mlab.com:49134/yelpcampkirbyy", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended : true}));
app.use(cors())
// app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(flash());
// seed the database
// seedDB();

// MOMENTJS
app.locals.moment = require("moment");
// PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret : "test express-session",
  resave : false,
  saveUninitialized : false
}));



app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// EVERYTHING INSIDE IN HERE CAN BE ACCESS GLOBALLY
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use("/", indexRoutes);
// process.env.PORT, process.env.IP
app.listen(5000, function(){
  console.log("Server has started in port 5000");
});
