'use strict';

var path = process.cwd()
var parser = require("ua-parser-js")


module.exports = function(app, passport) {

	app.route('/api/whoami')
		.get(function(req, res) {
			// Create the User Agent object
			var ua = {
				ipaddress: req.headers['x-forwarded-for'],
				language: req.headers['accept-language'],
				os: parser(req.headers['user-agent']).os
			}
			
			// Send the UA object to the client
			res.json(ua)
		});
}
