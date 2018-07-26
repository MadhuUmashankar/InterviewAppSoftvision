var mongoose = require('mongoose');
var passport = require('passport');
var settings = require('../config/settings');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../model/users");

router.post('/candidateInfo/register', function(req, res) {
  console.log('----------------------register', req.body.role)
  if (!req.body.firstname || !req.body.lastname || !req.body.username || !
    req.body.password || !req.body.role || !req.body.email || !req.body.confirmpassword
  ) {
    res.json({
      success: false,
      msg: 'Please pass username and password.'
    });
  } else {
    var newUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      password: req.body.password,
      role: req.body.role,
      email: req.body.email,
      confirmpassword: req.body.confirmpassword
    });
    console.log('new user-------------------', newUser);
    // save the user
    newUser.save(function(err) {
      if (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
          // Duplicate username
          return res.json({
            success: false,
            msg: 'Username already exists.'
          });
        }
      }

      res.json({
        success: true,
        msg: 'Successful created new user.'
      });
    });
  }
});

router.post('/candidateInfo/login', function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({
        success: false,
        msg: 'Authentication failed. User not found.'
      });
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign(user.toJSON(), settings.secret);
          // return the information including token as JSON
          res.json({
            success: true,
            token: 'JWT ' + token,
            username: req.body.username,
            role: user.role
          });
        } else {
          res.status(401).send({
            success: false,
            msg: 'Authentication failed. Wrong password.'
          });
        }
      });
    }
  });
});



module.exports = router;
