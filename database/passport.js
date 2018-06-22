var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var Admin = require('./index.js');

module.exports = function(passport) {
  passport.use(new FacebookStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: process.env.callbackURL,
    scope: ['user_friends', 'user_location'],
    profileFields: ['id', 'email', 'first_name', 'last_name', 'friends', 'location']
  },
  function(accessToken, refreshToken, profile, next) {
    // console.log(profile);
    const user = {
      'firstName': profile.name.givenName,
      'lastName': profile.name.familyName,
      'id': profile.id
    };

    Admin.isAdmin(user.id, function(err, admin) {
      console.log(`Userid is ${user.id}`);
      if (err) {
        return next(err, null);
      } else {
        profile.admin = admin;
        return next(null, profile);
      }
    });
  }));

  passport.serializeUser(function(user, next) {
    next(null, user);
  });

  passport.deserializeUser(function(id, next) {
    next(null, id);
  });
};