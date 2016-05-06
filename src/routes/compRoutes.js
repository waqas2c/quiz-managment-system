var express = require('express');
var compRouter = express.Router();
var Event = require('../models/events');
var multer = require('multer');
var bodyParser = require('body-parser');

var router = function (nav) {

    compRouter.route('/')

        .get(function (req, res) {
            res.render('competition', {
                title: 'Competition',
                nav: nav
            });
        })
        /*  Save Event to the db*/
        .post(function (req, res) {

            var event = new Event();
            event.name = req.body.event_name;
            event.startDate = new Date(req.body.startDate);
            event.endDate = new Date(req.body.endDate);
            event.category = req.body.category;
            event.imgUrl = req.body.imgUrl;

      
            event.save(function (err, doc) {
                if (err) { res.status(403).send(err) }
                else {
                    res.redirect('/Events');
                }

            });



        });

    return compRouter;

};

module.exports = router;