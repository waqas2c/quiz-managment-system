var express = require('express');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var participantModel = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    videoUrl: {
        type: String
    },
    imgUrl: {
        type: String
    },
    vote: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Participants', participantModel);
