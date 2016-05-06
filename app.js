var express = require('express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ecompetition');
var db = mongoose.connection;
var bodyParser = require('body-parser');


var multer = require('multer');

var PORT = process.env.PORT || 3000;
// nav is used in evry template file
var nav = [
    { Link: '/Events', Text: 'Events' },
    { Link: '/Participants', Text: 'Participant' },
    { Link: '/Judges', Text: 'Judges' },
    { Link: '/About', Text: 'About Us' },
    { Link: '/Contact', Text: 'Contact Us' }
];

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// ====================Require Routes ===============
var eventsRouter = require('./src/routes/eventRoutes')(nav);
var judgeRouter = require('./src/routes/judgeRoutes')(nav);
var participantRouter = require('./src/routes/participantRoutes')(nav);
var compRouter = require('./src/routes/compRoutes')(nav);


// =============================================================

app.use(express.static('public'));

app.set('views', './src/views');


app.set('view engine', 'ejs');

// =============routes middleware ===============
app.use('/Events', eventsRouter);
app.use('/Judges', judgeRouter);
app.use('/Participants', participantRouter);
app.use('/Competitions', compRouter);

app.get('/', function (req, res) {
    res.render('index', {
        title: 'home', nav: nav
    });
});

app.listen(PORT, function (err) {
    console.log('Server is Listening on PORT ' + PORT);
});