var mongoose = require('mongoose');

var wordSchema=mongoose.Schema({
	word: String,
	freq: Number
});

var Word = mongoose.model('User',wordSchema);

exports.Word=Word;


var userSchema=mongoose.Schema({
	name: String,
	pass: String,
	wordScore: Number
});

var User = mongoose.model('User',userSchema);

exports.User=User;