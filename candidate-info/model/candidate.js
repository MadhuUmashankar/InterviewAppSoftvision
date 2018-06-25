'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an object that shows
//the shape of your database entries.
var CandidateSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  phone: String,
  city: String,
  skills: String
});

//export our module to use in server.js

module.exports = mongoose.model('candidateInformationTables', CandidateSchema);
