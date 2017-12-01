var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var Admin = require('./index.js');
var config = require('./auth.js');

module.exports = function(passport) {
  passport.use(new FacebookStrategy({
    clientID        : config.facebookAuth.clientID,
    clientSecret    : config.facebookAuth.clientSecret,
    callbackURL     : config.facebookAuth.callbackURL,
    profileFields   : ['id', 'email', 'first_name', 'last_name']
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    Admin.isAdmin({ facebookId: profile.id }, function (err, profile) {
      //where does this done function go?
      return done(err, profile);
    });
  }));

  passport.serializeUser(function(user, done) {
    console.log(user);
    done(null, user);
  });

  passport.deserializeUser(function(id, done) {
    Admin.logout(id, function(err, rows) {
      if (rows === null) {
        done(null, 'No users found');
      } else if (err) {
        done(err, null);
      } else {
        done(null, rows[0]);
      }
    });
  });
};