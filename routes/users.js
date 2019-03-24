var express = require('express');
var router = express.Router();
var User = require('./../models/user.schema')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', (req, res, next) => {
  res.render('accounts/signup', {
    errors: req.flash('errors')
  });
});

router.post('/signup', (req, res, next) => {

  var user = new User();

  user.profile.name = req.body.name;
  user.password = req.body.password;
  user.email = req.body.email;

  User.findOne({
    email: req.body.email
  }, (err, existingUser) => {
    if (existingUser) {
      req.flash('error', `Accounts with ${req.body.email} is already registerd`)
      return res.redirect('/users/signup');
    } else {
      user.save((err, user) => {
        if (err)
          return next(err);
        return res.render('/')
      });
    };
  })
});
module.exports = router;