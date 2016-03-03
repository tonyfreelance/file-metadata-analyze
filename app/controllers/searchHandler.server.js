'use strict';

var Searches = require('../models/searches.js');

function SearchHandler() {

    this.addSearchTerm = function(term) {
        var termDoc = new Searches({
            term: term,
            when: Date.now()
        })
        
        termDoc.save(function(err) {
            if(err) {
                throw err
            } else {
                console.log('Term saved!')
            }
        })
    }
    
    this.showTerms = function(req,res) {
        Searches
            .find({}, {term: 1, when: 1, _id: 0})
            .sort({when: -1})
            .limit(10)
            .exec(function(err, results) {
                if(err) return res.send(err)
                res.json(results)
            })
    }
}

module.exports = SearchHandler;
