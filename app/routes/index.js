'use strict';

var path = process.cwd();
var moment = require("moment")

module.exports = function(app, passport) {

	app.route('/')
		.get(function(req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/:timestamp')
		.get(function(req, res) {
			var timestamp = {
				unix: null,
				natural: null
			}
			var inputTime = req.params.timestamp
			var time;
			// If input is unix timestamp
			if(moment.unix(inputTime).isValid()) {
				timestamp.unix = JSON.parse(inputTime)
				timestamp.natural = moment.unix(inputTime).format("MMMM DD, YYYY")
			} 
			// If input is natural human-readable date
			else if(moment(inputTime).isValid()) {
				timestamp.unix = moment(inputTime, "MMMM DD, YYYY").unix()
				timestamp.natural = moment(inputTime).format("MMMM DD, YYYY")
			} 
			
			res.json(timestamp)
			
		});
};
