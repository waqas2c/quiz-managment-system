var express = require('express');

var app = express();

var port = process.env.PORT || 5000;
// nav is used in evry template file
var nav = [
    { Link: '/Events', Text: 'Events' },
    { Link: '/Participants', Text: 'Participant' },
    { Link: '/Judges', Text: 'Judges' },
    { Link: '/About', Text: 'About Us' },
    { Link: '/Contact', Text: 'Contact Us' }
];

// ====================Require Routes ===============
var eventsRouter = require('./src/routes/eventRoutes')(nav);
var judgeRouter = require('./src/routes/judgeRoutes')(nav);
var participantRouter = require('./src/routes/participantRoutes')(nav);

app.use(express.static('public'));
app.set('views', './src/views');

app.set('view engine', 'ejs');

// =============routes middleware ===============
app.use('/Events', eventsRouter);
app.use('/Judges',judgeRouter);
app.use('/Participants',participantRouter);

app.get('/', function (req, res) {
    res.render('index', {
        title: 'home', nav: nav
    });
});


app.listen(port, function (err) {
    console.log('running server on port ' + port);
});