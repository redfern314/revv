var models = require('../models');
var WordPOS= require('wordpos');
var rem=require('rem');

var wordpos = new WordPOS();


Word=models.Word;


exports.getSyns=function(req,res){
	var text=req.params.text;
	wordpos.getPOS(text, function(parts){
		word=parts.adjectives[0]
		console.log(word)
		rem.json('http://words.bighugelabs.com/api/2/6967250016703c7776746000825296ea/'+word+'/json').get(function(err,content,res){
			console.log(content.adjective.syn)
		});
		res.send(parts);

	});
	

}