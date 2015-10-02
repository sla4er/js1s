exports.users =  {
	version : "0.0.1",

	_users   : [{ login : 'admin', password: 'admin', sessionid: ''},
				{ login : 'user', password: 'user', sessionid: ''}],
	get users(){ return this._users; },
	
	finduser: function( login ){
		var users = this.users;
		for (key in users) 
			if ( users[key].login === login) {
				return users[key];
			}
		return undefined;
	},
	validuser: function( login, password, sessionid){
		var user = this.finduser( login );
		if (user!=undefined && user.password===password){
			user.sessionid = sessionid;
			return true;	
		} 
		return false;
	},
	userbysession: function( sessionid ){
		var users = this.users;
		for (key in users) 
			if ( users[key].sessionid === sessionid) {
				return users[key];
			}
		return undefined;
	},
	logout: function( sessionid ){
		var users = this.users;
		for (key in users) 
			if ( users[key].sessionid === sessionid) {
				users[key].sessionid = undefined;
			}

	}	

}

