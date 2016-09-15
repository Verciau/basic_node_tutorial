"use strict";
/* jshint node: true */

var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var BearSchema = new Schema({
    name: String,
    color: String
});

module.exports = mongoose.model('Bear', BearSchema);