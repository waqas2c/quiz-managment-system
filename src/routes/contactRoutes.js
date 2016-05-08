var express = require('express');
var contactRouter = express.Router();


var router = function (nav) {
    /* Get All Events from DB*/
    contactRouter.route('/Contact')
        .get(function (req, res) {

            res.render('contact', {
                title: 'Contact Us',
                nav: nav
            });
        });

    contactRouter.route('/About')
        .get(function (req, res) {

            res.render('about', {
                title: 'About',
                nav: nav
            });
        });



    return contactRouter;
};



module.exports = router;