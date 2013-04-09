var models = require('../models');
var WordPOS= require('wordpos');
var wordpos = new WordPOS();


Word=models.Word;


exports.getSyns=function(req,res){
	var text=req.params.text;
	wordpos.getPOS(text, function(parts){
		word=parts.adjectives[0]
		console.log(word)
		res.send(parts);

	});
	

}