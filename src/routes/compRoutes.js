var express = require('express');
var compRouter = express.Router();
var Event = require('../models/events');
var multer = require('multer');
var bodyParser = require('body-parser');
var Particpant = require('../models/participants');
var Judge = require('../models/judges');
var user = require('../models/user');

var router = function(nav) {

    compRouter.route('/')

    .get(function(req, res) {
            var judgesList = [];
            user.find({'local.category':'Judge'}, function(err, judges) {
                console.log('judges');
                console.log(judges);
                if (!err) {
                    judgesList = judges;
                }
                res.render('addCompetition', {
                    title: 'Competition',
                    nav: nav,
                    judges: judgesList,
                    user:req.user
                });
            });

        })
        /*  Save Event to the db*/
        .post(function(req, res) {

            var event = new Event();
            event.name = req.body.event_name;
            event.startDate = new Date(req.body.startDate);
            event.endDate = new Date(req.body.endDate);
            event.category = req.body.category;
            event.imgUrl = req.body.imgUrl;
            event.desc = req.body.desc;

            /*  Save the Event to Db and Send Notification to all participants*/
            event.save(function(err, doc) {
                if (err) {
                    res.status(403).send(err)
                } else {
                    res.redirect('/');
                    // Send an email this event to all participant;
                    Particpant.find({}, function(err, participants) {
                        if (err) {
                            res.status(500).send(err);
                        }
                        console.log(participants);

                        var sendgrid = require('sendgrid')('HaiderMalik12', 'htc@1234');
                        // iterate all the participants and send email to all participants
                        for (var i = 0; i < participants.length; i++) {
                            var email = new sendgrid.Email({
                                to: participants[i].email,
                                from: 'haidermalik5044@gmail.com',
                                subject: event.category,
                                text: event.name
                            });
                            sendgrid.send(email, function(err, json) {
                                if (err) {
                                    return console.error(err);
                                }
                                console.log(json);
                            });
                        }

                    });
                }

            });



        });

    return compRouter;

};

module.exports = router;