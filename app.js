var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multer = require('multer');

// ================Passport require modules==========
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');


// -================Db Configuration==================
mongoose.connect('mongodb://localhost/ecompetition');
var db = mongoose.connection;

var app = express();
var PORT = process.env.PORT || 3000;

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: false }));



// nav is used in evry template file
var nav = [
    { Link: '/Events', Text: 'Events' },
    { Link: '/Participants', Text: 'Participant' },
    { Link: '/Judges', Text: 'Judges' },
    { Link: '/Competitions', Text: 'Competition' },
    { Link: '/About', Text: 'About Us' },
    { Link: '/Contact', Text: 'Contact Us' }
];


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// ====================Require Routes ===============
var eventsRouter = require('./src/routes/eventRoutes')(nav);
var judgeRouter = require('./src/routes/judgeRoutes')(nav);
var participantRouter = require('./src/routes/participantRoutes')(nav, app);
var compRouter = require('./src/routes/compRoutes')(nav);
var userRouter = require('./src/routes/userRoutes')(nav, app);
var contactRouter = require('./src/routes/contactRoutes')(nav);
// ==============View Engine =========================
app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

// =============routes middleware ===============
app.use('/Events', eventsRouter);
app.use('/Judges', judgeRouter);
app.use('/Participants', participantRouter);
app.use('/Competitions', compRouter);
app.use('/', userRouter);
app.use('/', contactRouter);
// required for passport
app.use(session({
    secret: "tank and spank",
    resave: true,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // use connect-flash for flash messages stored in session


app.get('/', function (req, res) {
    res.render('index', {
        title: 'home', nav: nav
    });
});


app.listen(PORT, function (err) {
    console.log('Server is Listening on PORT ' + PORT);
});