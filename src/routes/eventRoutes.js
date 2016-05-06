var express = require('express');
var eventsRouter = express.Router();
var Event = require('../models/events');
var fs = require('fs');

var router = function (nav) {

    var eventList = [];

    /* Get All Events from DB*/
    eventsRouter.route('/')
        .get(function (req, res) {
            Event.find(function (err, results) {
                if (err) { return res.status(500).send(err); }
                else {
                    eventList = results;
                }

                res.render('event', {
                    title: 'Event Details',
                    nav: nav,
                    events: eventList
                });
                // res.contentType(eventList[0].img.contentType);
                // res.send(eventList[0].img.data);
            });

        })
        /* Save an Event */
        .post(function (req, res) {
            var event = new Event(req.body);
            event.img.data = fs.readFileSync('./public/images/simple.jpg');
            event.img.contentType = 'image/jpg';

            event.save(function (err, result) {
                if (err) { res.status(500).send(event); }
                //  res.json(result);
                res.send('Image Saved to db');
            });

        });
    eventsRouter.route('/:eventId')
        .get(function (req, res) {
            var id = req.params.eventId;
            var event_;

            Event.findOne(Event._id, function (err, result) {
                if (err) { res.status(400).send(err) }
                else {
                    event_ = result;
                }
                res.render('eventView', {
                    title: 'Event Details',
                    nav: nav,
                    event: event_
                });
            });



        });
    return eventsRouter;
}


module.exports = router;