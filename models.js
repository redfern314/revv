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
            var newWord = new Word({word: currentWordFreq[0], freq: parseInt(currentWordFreq[1])})
            newWord.save(function (err) {
                if (err) {
                    console.log("error", err);
                }
            });
        }   
    });    
    res.send("Database population complete")
}

exports.Word=Word;
