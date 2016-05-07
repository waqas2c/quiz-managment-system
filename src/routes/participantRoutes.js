var express = require('express');
var participantRouter = express.Router();
var Particpant = require('../models/participants');

var router = function (nav, app) {
    var participantList = [];

    participantRouter.route('/')
        .get(function (req, res) {
            Particpant.find({}, function (err, docs) {
                if (err) { res.status(500).send(err); }
                else {
                    participantList = docs;
                }
            });
            res.render('participantListView', {
                title: 'Particpant',
                nav: nav,
                participants: participantList
            });
        });

    participantRouter.route('/:id')
        .get(function (req, res) {
            var id = req.params.id;
            var result = {};
            Particpant.findById({ _id: id }, function (err, doc) {
                if (err) { res.status(500).send(err); }
                else {
                    result = doc;
                    // res.json(participant);
                }
                res.render('participantView', {
                    title: 'Particpant Details',
                    nav: nav,
                    participant: result
                });
            });

        });
    app.post('/addVotes', function (req, res) {
        var result = {};

        Particpant.findById({ _id: req.body.id }, function (err, doc) {
            if (err) { res.status(500).send(err); }
            else {

                doc.vote += 1;
                console.log(doc.vote);
                doc.save();
                result = doc;
            }
            res.render('participantView', {
                title: 'Particpant Details',
                nav: nav,
                participant: result
            });

        });
    });
    /* Add New Particpant*/
    app.get('/add', function (req, res) {

        res.render('addParticipant', {
            title: 'Add Particpant',
            nav: nav
        });
    });

    /* Handle Post request when submit form */
    app.post('/add', function (req, res) {
        var participant = new Particpant();
        participant.firstName = req.body.first_name;
        participant.lastName = req.body.last_name;
        participant.email = req.body.email;
        participant.imgUrl = req.body.imgUrl;
        participant.videoUrl = req.body.videoUrl;
        participant.vote = 0;

        participant.save(function (err, results) {
            if (err) { res.status(500).send(err); }
            res.redirect('/Participants');
        });
    });
    return participantRouter;
};

module.exports = router;