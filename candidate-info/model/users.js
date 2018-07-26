'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

//create new instance of the mongoose.schema. the schema takes an object that shows
//the shape of your database entries.
var UserSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: Array,
        required: true
    },
    password: {
      type: String,
      required: true
    },
    confirmpassword: {
      type: String,
      required: true
    },
  });

  UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
            bcrypt.hash(user.confirmpassword, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.confirmpassword = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

  //export our module to use in server.js

  module.exports = mongoose.model('users', UserSchema);
