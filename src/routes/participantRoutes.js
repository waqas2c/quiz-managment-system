var express = require('express');
var participantRouter = express.Router();

var router = function (nav) {
    var participantList = [{ name: 'Haider Malik',src: 'http://api.randomuser.me/portraits/thumb/men/58.jpg'  }];
    participantRouter.route('/')
        .get(function (req, res) {
            res.render('participantListView', {
                title: 'Particpant',
                nav: nav,
                participants: participantList
            });
        });
        
    participantRouter.route('/:id')
        .get(function (req, res) {
            var id = req.params.id;
            res.render('participantView', {
                title: 'Particpant Details',
                nav: nav,
                participant: participantList[id]
            });
        });
    return participantRouter;
};

module.exports = router;