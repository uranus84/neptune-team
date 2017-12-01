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
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    const user = {
      'firstName' : profile.name.givenName,
      'lastName'  : profile.name.familyName,
      'id'        : profile.id
    };

    //where does this done function go?
    Admin.isAdmin(user.id, function(err, rows) {
      console.log(`Userid is ${user.id}`);
      if (rows[0] === undefined) {
        return done(null, false);
      } else if (err) {
        return done(err, null);
      } else {
        return done(null, profile);
      }
    });
  }));

  passport.serializeUser(function(user, done) {
    // console.log('wow dis is a user!', user);
    done(null, user);
  });

  passport.deserializeUser(function(id, done) {
    done(null, id);
  });
};