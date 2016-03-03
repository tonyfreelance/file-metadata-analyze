'use strict';

var path = process.cwd()
var googleImages = require('google-images')
var client = googleImages('009630864823783927675:sa4id2zghmk', 'AIzaSyDYZGBSd4Z1PG-8Ih34aQuH6y52ocUacBY')
var SearchHandler = require("../controllers/searchHandler.server.js")
var searchHandler = new SearchHandler()

module.exports = function(app, passport) {

	app.set('views', path + '/app/views')
	app.set('view engine', 'jade')

	// Main view
	app.route('/')
		.get(function(req, res) {
			res.render('index', {
				title: 'Image Search Abstraction Layer'
			})
		})

	// Handle the partial views
	app.route('/partial/:name')
		.get(function(req, res) {
			var name = req.params.name
			res.render('partials/' + name)
		})

	app.route('/search')
		.get(function(req, res) {
			// I can get the image URLs, alt text and page urls for a set of images relating to a given search string.
			// I can get a list of the most recently submitted search strings.
			if (req.query.search) {
				client.search(req.query.search, {
					page: req.query.offset
				}).then(function(images) {
					// Save to database
					searchHandler.addSearchTerm(req.query.search)

					// Response to client
					res.json(images)
				})
			}
			else {
				// res.status(400).send({status:400, message: 'Please type in the search term!'})
				res.redirect('/')
			}
		})

	// I can get a list of the most recently submitted search strings.
	app.route('/history')
		.get(searchHandler.showTerms)

	// redirect all others to the index (HTML5 history)
	app.route('*')
		.get(function(req, res) {
			res.redirect('/')
		})
}
