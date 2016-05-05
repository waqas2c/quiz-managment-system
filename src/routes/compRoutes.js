var express = require('express');
var compRouter = express.Router();
var Event = require('../models/events');
var router = function (nav) {
     compRouter.route('/')
              
               .get(function(req,res){
                   res.render('competition',{
                       title:'Competition',
                       nav:nav
                    });
               })
               /*  Save Event to the db*/
               .post(function(req,res){
                     var event = new Event(req.body); 
                  
                   event.save(function(err,results){
                       if(err){return res.status(400).send(err);}
                       else{
                        res.send(results);
                       }
                   });
               });
   
    return compRouter;
    
};

module.exports = router;