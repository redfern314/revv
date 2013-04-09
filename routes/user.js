models=require('../models')
User=models.User;

exports.addNew=function(req,res){
	user=new User();
	user.name=req.params.name;
	user.pass=req.params.pass;
	user.wordScore=0;
	user.save(function(err){
		console.log(err);
	})
};

exports.login=function(req,res){
	User.find({}).execFind(function(err,user){
		console.log(user)
		req.sessions.user=user;
	})
}
