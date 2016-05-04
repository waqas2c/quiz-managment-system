var express = require('express');
var eventsRouter = express.Router();

var router = function (nav) {

    var eventList = [{ name: 'cricket Tournament', startDate: new Date(), endDate: new Date(), category: 'Cricket' },
        { name: 'Music Hangama', startDate: new Date(), endDate: new Date(), category: 'Music' },
        { name: 'Naat Competiton', startDate: new Date().toDateString(), endDate: new Date().toDateString(), category: 'Naat' },
        { name: 'Singing Splash', startDate: new Date(), endDate: new Date(), category: 'Singing' },
        { name: 'football Tournament', startDate: new Date(), endDate: new Date(), category: 'footbale' },
        { name: 'Bedminten Tournament', startDate: new Date(), endDate: new Date(), category: 'bedminten' },
        { name: 'Tug War', startDate: new Date(), endDate: new Date(), category: 'Tag of War' }
    ];
    eventsRouter.route('/')
        .get(function (req, res) {
            res.render('event', {
                title: 'home', nav: nav,
                events: eventList
            });
        });
    eventsRouter.route('/:eventId')
        .get(function (req, res) {
            var id = req.params.eventId;
            res.render('eventView', {
                title: 'Event Details',
                nav:nav,
                event: eventList[id]
            });
        });
    return eventsRouter;
}


module.exports = router;