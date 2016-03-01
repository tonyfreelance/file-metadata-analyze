'use strict';

var path = process.cwd()
var URLs = require('machinepack-urls')
var shortid = require('shortid')
var UrlHandler = require(path + '/app/controllers/urlHandler.server.js')

module.exports = function(app, passport) {
	
	var urlHandler = new UrlHandler()

	app.route('/')
		.get(function(req, res) {
			res.sendFile(path + '/public/index.html')
		})

	// 1. I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
	app.route('/new/*?')
		.get(function(req, res) {
			var url = req.params[0]
			
			// Create random string
			var id = shortid.generate()

			// Shortened url
			var shortenUrl = req.protocol + '://' + req.get('host') + '/' + id

			// Object to be shown 
			var result = {
				original_url: null,
				short_url: shortenUrl
			}

			// Determine whether the specified string is a valid, fully-qualified URL.
			try {
				URLs.validate({
					string: url,
				}).execSync()
				
				// Save the url to database
				urlHandler.addUrl(id, url)
				
				// Response to client
				result.original_url = url
				res.json(result)

			}
			catch (err) {
				if (err.exit === 'invalid') {
					result.original_url = err.exit
					return res.json(result)
				}
			}
		})
	
	// 2. When I visit that shortened URL, it will redirect me to my original link.
	app.route('/:id')
		.get(urlHandler.redirect)
}
