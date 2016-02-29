'use strict';

var Urls = require('../models/urls.js');

function UrlHandler() {

    this.addUrl = function(id, url) {
        Urls
            .findOneAndUpdate({
                urlId: id
            }, {
                urlId: id,
                fullUrl: url
            }, {
                upsert: true
            }, function(err, result) {
                if (err) throw err
            })
    }

    this.redirect = function(req, res) {
        Urls
            .findOne({
                urlId: req.params.id
            }, function(err, result) {
                if (err) return res.send(err)

                // Look for the id in database
                // If existed, then redirect
                if (result) {
                    res.status(301)
                    res.redirect(result.fullUrl)
                    res.send()
                }
                // If not, response not found
                else {
                    res.status(404)
                    res.json('Error: No short url found for given input')
                }
            })
    }
}

module.exports = UrlHandler;
