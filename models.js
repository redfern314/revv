var mongoose = require('mongoose');

var wordSchema=mongoose.Schema({
	word: String,
	freq: Number
});

var Word = mongoose.model('User',wordSchema);

exports.Word=Word;