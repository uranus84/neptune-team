var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var Admin = require('./index.js');
var config = require('./auth.js');

module.exports = function(passport) {
  passport.use(new FacebookStrategy({
    clientID        : config.facebookAuth.clientID,
    clientSecret    : config.facebookAuth.clientSecret,
    callbackURL     : config.facebookAuth.callbackURL,
    scope           : ['user_friends'],
    profileFields   : ['id', 'email', 'first_name', 'last_name', 'friends']
  },
  function(accessToken, refreshToken, profile, next) {
    console.log(profile);
    const user = {
      'firstName' : profile.name.givenName,
      'lastName'  : profile.name.familyName,
      'id'        : profile.id
    };

    //where does this next function go?
    Admin.isAdmin(user.id, function(err, rows) {
      console.log(`Userid is ${user.id}`);
      if (rows[0] === undefined) {
        return next(null, false);
      } else if (err) {
        return next(err, null);
      } else {
        return next(null, profile);
      }
    });
  }));

  passport.serializeUser(function(user, next) {
    // console.log('wow dis is a user!', user);
    next(null, user);
  });

  passport.deserializeUser(function(id, next) {
    next(null, id);
  });
};