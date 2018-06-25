var mongoose = require('mongoose');
var passport = require('passport');
var settings = require('../config/settings');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/candidateInformationTable', ['users'] );

// router.post('/candidateInfo/register', function(req, res, next){
//     var user = req.body;
//     if(!user.username || !user.email || !(user.password + '') || !(user.confirmpassword + '')){
//         res.status(400);
//         res.json({
//             "error": "Bad Data"
//         });
//     } else {
//         db.users.save(user, function(err, user){
//             if(err){
//                 res.send(err);
//             }
//             res.json(user);
//         });
//     }
// });

router.post('/candidateInfo/register', function(req, res) {
  if (!req.body.username || !req.body.password || !req.body.email || !req.body.confirmpassword) {
    res.json({success: false, msg: 'Please pass username and password.'});
  } else {
    var user = req.body;
    // save the user
    db.users.save(user, function(err, user){
      if(err){
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json(user);
    });
  }
});

router.post('/candidateInfo/login', function(req, res) {
  db.users.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign(user.toJSON(), settings.secret);
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

module.exports = router;
