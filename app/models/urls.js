var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Url = new Schema({
    urlId: {
      type: String
    },
    fullUrl: {
        type: String
    }
})

module.exports = mongoose.model('Url', Url);