var express = require('express');
var compRouter = express.Router();

var router = function (nav) {
     compRouter.route('/')
               .get(function(req,res){
                   res.render('competition',{
                       title:'Competition',
                       nav:nav
                    });
               });
   
    return compRouter;
};

module.exports = router;