'use strict';

var path = process.cwd()
var multer = require('multer')
var upload = multer()

module.exports = function(app, passport) {

	app.set('views', path + '/app/views')
	app.set('view engine', 'jade')

	// Main view
	app.route('/')
		.get(function(req, res) {
			res.sendFile(path + '/public/index.html')
		})

	app.post('/api/fileanalyze', function(req, res, next) {
		upload.single('doc')(req, res, function(err) {
			if (err) {
				// An error occurred when uploading 
				return res.send(err)
			}
			// Everything went fine
			res.json('File size:' + req.file.size)
		})
	})

	// Handle the partial views
	// app.route('/partial/:name')
	// 	.get(function(req, res) {
	// 		var name = req.params.name
	// 		res.render('partials/' + name)
	// 	})

	// app.route('/search')
	// 	.get(function(req, res) {
	// 		// I can get the image URLs, alt text and page urls for a set of images relating to a given search string.
	// 		// I can get a list of the most recently submitted search strings.
	// 		if (req.query.search) {
	// 			client.search(req.query.search, {
	// 				page: req.query.offset
	// 			}).then(function(images) {
	// 				// Save to database
	// 				searchHandler.addSearchTerm(req.query.search)

	// 				// Response to client
	// 				res.json(images)
	// 			})
	// 		}
	// 		else {
	// 			// res.status(400).send({status:400, message: 'Please type in the search term!'})
	// 			res.redirect('/')
	// 		}
	// 	})

	// // I can get a list of the most recently submitted search strings.
	// app.route('/history')
	// 	.get(searchHandler.showTerms)

	// redirect all others to the index (HTML5 history)
	app.route('*')
		.get(function(req, res) {
			res.redirect('/')
		})
}
