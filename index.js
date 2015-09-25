

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


var Datastore = require('nedb')
  , users = new Datastore({ filename: 'db/users' });


var Users = require("./models/users");
console.log(Users);

users.loadDatabase(function (err) {    // Callback is optional
  // Now commands will be executed
});

app.get('/', function (req, res) {
  res.render('index', { title: 'Main page', message: 'Hello, it\'s main page ('+req.sessionID+')!'});
})

app.get('/config', function (req, res) {
  res.render('config', { title: 'Config page', message: 'Config page !'});
})

app.get('/work', function (req, res) {
  res.render('work', { title: 'Work page', message: 'Work page !'});
})

var sSem = true;
app.route('/login')
	.get( function (req, res) {
  		res.render('login', { title: 'Login page', message: 'Login page !'});
	})
	.post( function (req, res) {
		console.log(req.body);
			Users.findUserByName( req.body.username, function(err, doc){
			console.log('finded '+doc+' '+req.sessionID+' ');
  			if (doc && doc.password == req.body.password) {
  				//Users.updateSessionByNumeUser( doc.username, req.sessionID );
  				res.send('ok');
  			}else{
  				res.send('failed');
  			}
  		});

	});


var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})