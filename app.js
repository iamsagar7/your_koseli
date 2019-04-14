var express = require("express");
var morgan = require("morgan");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var ejs = require("ejs");
var engine = require("ejs-mate");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var flash = require("express-flash");
var MongoStore = require("connect-mongo")(session);
var passport = require("passport");
var config = require("./config/index");
var chalk = require("chalk");
var faker = require("faker");
var cartLength = require("./middlewares/middlewares");

var User = require("./models/user");
var Category = require("./models/category");

var app = express();

db = require("./db");
app.use(cookieParser("secret"));

// Middleware
app.use(express.static(__dirname + "/public"));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: config.secretKey,
    store: new MongoStore({ url: config.app.database, autoReconnect: true })
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});
app.use(cartLength);
app.use(function(req, res, next) {
  Category.find({}, function(err, categories) {
    if (err) return next(err);
    res.locals.categories = categories;
    next();
  });
});

app.engine("ejs", engine);
app.set("view engine", "ejs");

var mainRoutes = require("./routes/main");
var userRoutes = require("./routes/user");
var adminRoutes = require("./routes/admin");
var apiRoutes = require("./api/api");

app.use(mainRoutes);
app.use(userRoutes);
app.use(adminRoutes);
app.use("/api", apiRoutes);

app.listen(config.app.port, function(err) {
  if (err) throw err;
  console.log(chalk.blue("Server is Running on port " + config.app.port));
});
