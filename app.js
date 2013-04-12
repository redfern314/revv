
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , synon = require('./routes/synon')
  , http = require('http')
  , mongoose= require('mongoose')
  , path = require('path')
  , wordDB = require('./models');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  mongoose.connect(process.env.MONGOLAB_URI || 'localhost/words');
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/showDB',synon.showDB);
app.post('/synon',synon.getSyns)
// app.get('/login/:name/:pass',user.login)
// app.post('/newUser/:name/:pass',user.addNew)
app.get('/populatehistogram', wordDB.populate)
app.post('/lookup',wordDB.lookup);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
