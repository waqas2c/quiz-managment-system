var express = require('express');
var judgeRouter = express.Router();

var router = function (nav) {

    var judgeList = [{ name: 'Katty Perry', profession: 'Music Master', src:'http://api.randomuser.me/portraits/thumb/women/56.jpg'},
        { name: 'Kaleem Ulah', profession: 'Cricketer', src:'http://www.coolmenhairstyles.com/wp-content/uploads/What-every-man-should-know-before-haircut-33-150x150.jpg'},
        { name: 'Kevin Paul', profession: 'Singer',src:'http://www.coolmenhairstyles.com/wp-content/uploads/What-every-man-should-know-before-haircut-30-150x150.jpg' },
        { name: 'Shaun Tait', profession: 'Footballer', src:'http://www.fashionchip.com/wp-content/uploads/2014/04/Spiky-Hairstyles-for-Fine-Hair-Men--300x300.jpg'},
        { name: 'Martin Garrix', profession: 'Designer',src:'http://www.coolmenhairstyles.com/wp-content/uploads/What-every-man-should-know-before-haircut-22-150x150.jpg' }

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