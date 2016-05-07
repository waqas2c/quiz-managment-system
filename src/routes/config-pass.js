var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var User = require("../models/user");

// This strategy is used for Login
var localRegisterInit = function (req, email, password, callback) {
    User.findOne({ "local.email": email }, function (err, user) {
        if (err) {
            return callback(err);
        }

        if (user) {
            // TODO: supply message
            return callback(null, false);
        }

        var newUser = new User();
        newUser.local.email = email;
        newUser.local.password = newUser.hashPassword(password);

        newUser.save(function (err) {
            if (err) {
                throw err;
            }

            return callback(null, newUser);
        });
    });
};

// This strategy is used for LocalLogin
var localLoginInit = function (req, email, password, callback) {
    User.findOne({ "local.email": email }, function (err, user) {
        if (err) {
            return callback(err);
        }

        if (!user || !user.validatePassword(password)) {
            // TODO: supply generic message
            return callback(null, false);
        }

        return callback(null, user);
    });
};

// Options
var localOptions = {
    usernameField: "emailAddress",
    passReqToCallback: true
};

// create a local-register strategy
passport.use("local-register", new LocalStrategy(localOptions, localRegisterInit));
// create a local login strategy
passport.use("local-login", new LocalStrategy(localOptions, localLoginInit));

// used for session
passport.serializeUser(function (user, callback) {
    callback(null, user.id);
});

// used for session
passport.deserializeUser(function (id, callback) {
    User.findById(id, function (err, user) {
        callback(err, user);
    });
});

// export this local register strategy
module.exports = function () {

    var localRegister = passport.authenticate("local-register", {
        successRedirect: "/",
        failureRedirect: "/register"
    });
    // exports this loocal login strategt
    var localLogin = passport.authenticate("local-login", {
        successRedirect: "/",
        failureRedirect: "/login"
    });
    return {
        localLogin: localLogin,
        localRegister: localRegister
    };
}

