//********************************************************
var Engine = require("tingodb")();
assert = require('assert');
var db = new Engine.Db('./db/', {});


var collectionUsers = db.collection("ls_users");

collectionUsers.findOne({ username: "admin" }, function(err, doc){
	console.log(doc);
	if (!doc)
	 collectionUsers.insert({ username: "admin", password: "admin"},  function(err, result){
		console.log(result);
	});
});


function User(name){
	this.name = name;
};

User.prototype.hello = function(){
	console.log('Hello, '+this.name);
};

function findUserByName( _nameuser, cb ){
	collectionUsers.findOne({ username: _nameuser }, function(err, doc){
		cb(err, doc);
	});
};

function updateSessionByNumeUser( _nameuser, _sessionID ){
	collectionUsers.update({ username: _nameuser }, { session: _sessionID });
}

exports.User = User;
exports.findUserByName = findUserByName;
exports.updateSessionByNumeUser = updateSessionByNumeUser ;