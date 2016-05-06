var express = require('express');
var compRouter = express.Router();
var Event = require('../models/events');
var multer = require('multer');
var bodyParser = require('body-parser');
var fs = require('fs');

var router = function (nav) {

    compRouter.route('/')

        .get(function (req, res) {
            res.render('competition', {
                title: 'Competition',
                nav: nav
            });
        })
        /*  Save Event to the db*/
        .post(multer({ dest: './uploads/' }).single('projectimage'), function (req, res) {

            var event = new Event();
            event.name = req.body.event_name;
            event.startDate = new Date(req.body.startDate);
            event.endDate = new Date(req.body.endDate);
            event.category = req.body.caetgory;
            // read the buffer from the image file
            event.img.data = fs.readFileSync(req.file.path);
            event.img.contentType = req.file.mimetype;

            if (req.file) {
                event.save(function (err, doc) {
                    if (err) { res.status(403).send(err) }
                    else {
                        res.redirect('/Events');

                    }
                });
            }
            /* example output:
            { title: 'abc' }
             */
            //  console.log(req.file); //form files
            /* example output:
                    { fieldname: 'upl',
                      originalname: 'grumpy.png',
                      encoding: '7bit',
                      mimetype: 'image/png',
                      destination: './uploads/',
                      filename: '436ec561793aa4dc475a88e84776b1b9',
                      path: 'uploads/436ec561793aa4dc475a88e84776b1b9',
                      size: 277056 }
             */
            // // Prepare output in JSON format
            // var response = {
            //     eventName: req.body.eventName,
            //     startDate: req.body.startDate,
            //     endDate: req.body.endDate,
            //     caetgory: req.body.category

            // };
            // console.log(response);
            // console.log(req.file.path);
            // res.end(JSON.stringify(response));
            // res.json(req.body); // req.body is your form data//form fields

        });

    return compRouter;

};

module.exports = router;