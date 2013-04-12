var models = require('../models');
var WordPOS= require('wordpos');
// var rem=require('rem');
var rest=require('restler');
var parseString=require('xml2js').parseString;

var wordpos = new WordPOS();


Word=models.Word;

exports.showDB=function(req,res){
	Word.find({word: 'the'}).execFind(function(err,data){
		res.send(data);
	});
}

exports.getSyns=function(req,res){
	clientWords={};
	clientWords.words=[];
	var text=req.body.text;
	wordpos.getPOS(text, function(parts){
		words=parts.adjectives//.concat(parts.nouns);
		Word.find({word: {$in: words}}).sort({freq: -1}).execFind(function(err,data){ //most common first
			infreq=data.slice(0,10);
			for(inf in infreq){
				rest.get('http://www.dictionaryapi.com/api/v1/references/thesaurus/xml/'+infreq[inf].word+'?key=d470e80a-8345-4d13-86c2-31cf7a9fc005').on('complete',function (content){
					parseDef(content);
				});
			}
		});
	});
	function parseDef(xmlContent){
		parseString(xmlContent,function(err, thesOb){
			thesOb=thesOb.entry_list.entry;
			for(var i in thesOb){
				//check for POS
				if(thesOb[i].fl[0] == ['adjective'][0]){
					//add old word
					var cWord={};
					cWord.old=String(thesOb[i].term[0].hw);
					cWord.new=[];
					def=(thesOb[i].sens[0].mc);

					synString=(thesOb[i].sens[0].syn)[0];
					if (typeof(synString)!='string'){
						synString=(thesOb[i].sens[0].syn)[0]._;
					}
					synString=synString.replace(/ /g,'');
					syns=synString.split(',');
					Word.find({word: {$in: syns}}).sort({freq: 1}).execFind(function(err,synLookup){ //least common first
						user_param=.6; //should multiply by orig. frequency.
						if (synLookup) {
							ind=Math.round(synLookup.length*user_param);
							//add new word to old word
							for (var i=ind-3;i<(ind+3);i++){
								var replaceWord={}
								replaceWord.word=(synLookup[i].word)
								cWord.new[cWord.new.length]=replaceWord;
							}
							clientWords.words[clientWords.words.length]=cWord;
							if(clientWords.words.length>=infreq.length){
								res.send(JSON.stringify(clientWords,null," "));
							}
						} else {
							res.send(JSON.stringify({words: [ {"old": "big", "new": [ {"word": "huge"}, {"word": "vast"} ] } ]}));
						}
					});

					break;
				}
			}
		});
	}

}

// 