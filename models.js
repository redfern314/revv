var mongoose = require('mongoose');

var fs = require('fs');

var wordSchema=mongoose.Schema({
    word: String,
    freq: Number
});

var Word = mongoose.model('Word', wordSchema);




exports.populate = function(req, res){
    fs.readFile('./words.txt', 'utf8',  function (err, data) {
        var wordfreq = data.split("\n");
        console.log("Starting population")
        for (word in wordfreq){

            var currentWordFreq = (wordfreq[word]).split(" ");
            console.log("Adding: " + currentWordFreq[0])
            var newWord = new Word({word: currentWordFreq[0], freq: parseInt(currentWordFreq[1])})
            newWord.save(function (err) {
                if (err) {
                    console.log("error", err);
                }
                else{
                    console.log("Added " + currentWordFreq[0]);
                }
            });
        }   
    });    
}

exports.Word=Word;


var userSchema=mongoose.Schema({
	name: String,
	pass: String,
	wordScore: Number
});

var User = mongoose.model('User',userSchema);

exports.User=User;
