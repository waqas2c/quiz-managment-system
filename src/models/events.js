var express = require('express');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var eventModel = new Schema({
    name: {
        type: String
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        default: Date.now
    },
    category: {
        type: String
    },
    img: {
        data: Buffer,
        contentType: String,
    }
});

module.exports = mongoose.model('Events', eventModel);
