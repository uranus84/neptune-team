if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

var express = require('express');
var axios = require('axios');
// var key = require('./API.js');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var session = require('express-session');
var cors = require('cors');
var env = require('node-env-file');
var db = require('../database/index.js');
var bodyParser = require('body-parser');
var queryString = require('query-string');
var indico = require('indico.io');
var Twitter = require('twitter');
var moment = require('moment');
var url = require('url');
var cache = require('memory-cache');

require('../database/passport.js')(passport);
indico.apiKey = process.env.INDICO_API;
var indicoHelper = require('./indicoHelper');

var client = new Twitter({
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.API_SECRET,
  access_token_key: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

var app = express();

var corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));

app.use(express.static(__dirname + '/../client/dist'));
// app.use(bodyParser.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: 's3cr3t',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// app.all('/*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook'), (req, res) => {
    cache.put(req.sessionID, req.user);
    res.redirect(url.format({
      pathname: '/',
      query: {
        session: req.sessionID
      }
    }));
  }
);

app.get('/moderator', (req, res) => {
  if (req.user) {
    res.send(req.user.admin);
  } else {
    console.log('no user is logged in');
    res.send();
  }
});

app.get('/logout', function (req, res) {
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }
    req.logout();

    res.redirect('/');
  });
});

app.get('/GET', (req, res) => {
  //console.log('GET REQUEST');
  res.status(200);
  res.end('Hello San Francisco');
});

app.get('/googlepics', (req, res) => {
  console.log('MAKING A GET');
  //Gets a location based on a long/latitude
  var locationData = req.query.lat + ', ' + req.query.lon; 
  axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {params: {key: (process.env.GOOGLE_MAP_API || key.GOOGLE_MAP_API), location: locationData, radius: 2000}})
    .then ((results) =>{
      var photoArray = results.data.results;
      //var photoString = results.data.results[0].photos[0].photo_reference;
      var imageUrlArray = [];
      photoArray.forEach((result) =>{
        if (Array.isArray(result.photos)) {
          imageId = result.photos[0].photo_reference;
          imageUrlArray.push('https://maps.googleapis.com/maps/api/place/photo?maxheight=5000&maxwidth=5000&key=' + (process.env.GOOGLE_MAP_API || key.GOOGLE_MAP_API) + '&photoreference=' + imageId);
        }
      });
      if (imageUrlArray.length > 0) {
        res.end(JSON.stringify(imageUrlArray));
      } else {
        res.end(JSON.stringify('No results'));
      }
    })
    .catch((error) =>{
      console.log(error);
      res.status(200);
      res.end('error');
    });

});

app.get('/walkscore', (req, res) => {
  var locationData = {lat: req.query.lat, lon: req.query.lon};
  axios.get('http://api.walkscore.com/score', {params: {lat: locationData.lat, lon: locationData.lon, wsapikey: (process.env.WALKSCORE_API || key.WALKSCORE_API), address: '', format: JSON}})
    .then ((results) => {
      //console.log(results);
      //Returned value is a weird string, splitting it to get just the walk score out
      results.data = results.data.split(',');
      results.data[2] = results.data[2].split(': ');
      res.status(200);
      res.end(JSON.stringify(results.data[2][1]));
    })
    .catch((error) => {
      //console.log(error);
      res.status(200);
      res.end('No results');
    });
});

app.post('/tips', (req, res)=> {
  // console.log('CLIENT REQ TO SERVER POST @ /tips = ', req.body);
  db.addTipToDataBaseFn(req.body, (err, data) => {
    if (err) {
      console.log('Error in POST to /tips = ', err);
    }
    res.status(201);
    res.end(JSON.stringify(data));
  });
});

app.get('/tips', (req, res) => {
  // console.log('CLIENT REQ TO SERVER GET @ /tips = ', req.query);
  db.getLocalTipsFromDataBaseFn(req.query, (err, info) => {
    if (err) {
      if (err.fatal) {
        console.trace('fatal error: ' + err.message);
      }
      console.log('Error in GET to /tips', err);
    } else {
      // console.log('INFO ABOUT TO BE SENT ON GET = ', info)
      res.send(info);
    }
  });
});

app.put('/tips', (req, res) => {
  db.flagTip(req.body.tipId, req.body.concern, (err, results) => {
    if (err) {
      if (err.fatal) {
        console.trace('fatal error: ' + err.message);
      }
      console.log('Error in PUT to /tips', err);
    } else {
      res.send(`tip ${req.body.tipId} flagged`);
    }
  });
});

app.get('/admin', (req, res) => {
  db.getAllTips((err, tips) => {
    if (err) {
      if (err.fatal) {
        console.trace('fatal error: ' + err.message);
      }
      console.log('Error in GET to /admin', err);
    } else {
      res.send(tips);
    }
  });
});

app.put('/admin', (req, res) => {
  db.updateTipStatus(req.body.tipId, req.body.status, req.body.concern, (err, results) => {
    if (err) {
      if (err.fatal) {
        console.trace('fatal error: ' + err.message);
      }
      console.log('Error in PUT to /admin', err);
    } else {
      res.send(`tip ${req.body.tipId} updated`);
    }
  });
});

app.post('/admin', (req, res) => {
  res.send('HIDDEN CONTENT');
});

app.get('/recentTweetsFrom', (req, res) => {
  var locationData = req.query.lat + ',' + req.query.lon + ',10mi';
  //couldnt figure out how to search for anything so i searched for tweets that dont contain sddsssjd
  client.get('search/tweets', {q: ' -sddsssjd', lang: 'en', count: '100', result_type: 'recent', geocode: locationData})
    .then(function (tweets) {
      var tweetArr = [];
      tweets.statuses.map((val) => { tweetArr.push(val.text); });

      //get indico score
      indicoHelper.sendIndicoData(req, res, tweetArr);
    })
    .catch(function (error) {
      throw error;
    });
});

app.get('/oldTweetsFrom', (req, res) => {
  var locationData = req.query.lat + ',' + req.query.lon + ',10mi';
  var date = new Date();
  var oneWeekAgo = moment(date.setDate(date.getDate() - 7)).format().split('T')[0];
  //couldnt figure out how to search for anything so i searched for tweets that dont contain sddsssjd
  client.get('search/tweets', {q: `-sddsssjd until:${oneWeekAgo}`, lang: 'en', count: '100', result_type: 'recent', geocode: locationData})
    .then(function (tweets) {
      var tweetArr = [];
      tweets.statuses.map((val) => { tweetArr.push(val.text); });

      //get indico score
      indicoHelper.sendIndicoData(req, res, tweetArr);
    })
    .catch(function (error) {
      throw error;
    });
});

app.get('/recentTweetsAbout', (req, res) => {
  var city = req.query.city;
  var cityShortName = req.query.cityShortName;

  client.get('search/tweets', {q: `${city} OR ${cityShortName}`, lang: 'en', count: '100', result_type: 'recent'})
    .then(function (tweets) {
      var tweetArr = [];
      tweets.statuses.map((val) => { tweetArr.push(val.text); });

      //get indico score
      indicoHelper.sendIndicoData(req, res, tweetArr);
    })
    .catch(function (error) {
      throw error;
    });
});

app.get('/oldTweetsAbout', (req, res) => {
  var city = req.query.city;
  var cityShortName = req.query.cityShortName;
  var date = new Date();
  var oneWeekAgo = moment(date.setDate(date.getDate() - 7)).format().split('T')[0];

  client.get('search/tweets', {q: `${city} OR ${cityShortName} until:${oneWeekAgo}`, lang: 'en', count: '100', result_type: 'recent'})
    .then(function (tweets) {
      var tweetArr = [];
      tweets.statuses.map((val) => { tweetArr.push(val.text); });

      //get indico score
      indicoHelper.sendIndicoData(req, res, tweetArr);
    })
    .catch(function (error) {
      throw error;
    });
});

app.get('/topTweetsAbout', (req, res) => {
  var city = req.query.city;
  var cityShortName = req.query.cityShortName;

  client.get('search/tweets', {q: `${city} OR ${cityShortName}`, lang: 'en', count: '3', result_type: 'popular'})
    .then(function (tweets) {
      // console.log(tweets.statuses[0].text);
      res.status(200);
      res.end(JSON.stringify(tweets.statuses));
    })
    .catch(function (error) {
      throw error;
    });
});

app.get('/topTweetsFrom', (req, res) => {
  var locationData = req.query.lat + ',' + req.query.lon + ',10mi';
  // console.log(locationData)
  //couldnt figure out how to search for anything so i searched for tweets that dont contain sddsssjd
  client.get('search/tweets', {q: ' -sddsssjd', lang: 'en', count: '3', result_type: 'mix', geocode: locationData})
    .then(function (tweets) {
      // console.log(tweets);
      res.status(200);
      res.end(JSON.stringify(tweets.statuses));
    })
    .catch(function (error) {
      throw error;
    });
});

var port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

