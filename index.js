var conf = require('./conf/current.js');

var express = require('express')
var app = express()

var cookieParser = require('cookie-parser');
app.use(cookieParser('My app 2015'));

var session = require('express-session');
app.use(session({secret: 'My app 2015', resave: false, saveUninitialized: true}));


var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use( bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use('/js', express.static (__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/img', express.static(__dirname + '/img'));

app.set('view engine', 'jade');

app.get('/', function (req, res) {
  var user = conf.users.userbysession(req.sessionID);
  if (!user) res.redirect('/login');
  res.render('index', { title: 'Main page', message: 'Hello, '+conf.users.userbysession(req.sessionID)+'!', user: conf.users.userbysession(req.sessionID)});
})

app.get('/config', function (req, res) {
  res.render('config', { title: 'Config page', message: 'Config page !', user: conf.users.userbysession(req.sessionID)});
})

app.get('/work', function (req, res) {
  res.render('work', { title: 'Work page', message: 'Work page !', user: conf.users.userbysession(req.sessionID)});
})

app.get('/logout', function (req, res) {
  var user = conf.users.userbysession(req.sessionID);
  if (user) conf.users.logout(req.sessionID);
  res.redirect('/');
})

app.route('/login')
	.get( function (req, res) {
    var user = conf.users.userbysession(req.sessionID);
  		res.render('login', { title: 'Login page', message: 'Login page !', user: user});
	})
	.post( function (req, res){
  			 if (conf.users.validuser(req.body.username, req.body.password, req.sessionID)) {
  			 	res.send('ok');
  			 }else{
  			 	res.send('failed');
  			 }
	});


var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})