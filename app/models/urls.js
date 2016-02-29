var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Url = new Schema({
    urlId: {
      type: String,
      unique: true
    },
    fullUrl: {
        type: String,
        unique: true
    }
})

module.exports = mongoose.model('Url', Url);