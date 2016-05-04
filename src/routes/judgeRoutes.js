var express = require('express');
var judgeRouter = express.Router();

var router = function (nav) {

    var judgeList = [{ name: 'Martin Garrix', profession: 'Music Master', },
        { name: 'Shaun Polck', profession: 'Cricketer', },
        { name: 'Kevin Pieterson', profession: 'Cricketer', },
        { name: 'David Backham', profession: 'Footballer', },
        { name: 'Marko Gargenta', profession: 'Designer', },
        { name: 'Steven Smith', profession: 'Fashion Designer', }

    ];
    judgeRouter.route('/')
        .get(function (req, res) {
            res.render('JudgeListView', {
                title: 'Judges', nav: nav,
                judges: judgeList
            });
        });
    judgeRouter.route('/:judgeId')
        .get(function (req, res) {
            var id = req.params.eventId;
            res.render('judgeView', {
                title: 'Judges Details',
                nav: nav,
                judge: judgeList[id]
            });
        });
    return judgeRouter;
}


module.exports = router;