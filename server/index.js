var express = require('express');
var axios = require('axios');
var key = require('./API.js');
var indico = require('indico.io');
var Twitter = require('twitter');
var moment = require('moment');
indico.apiKey = process.env.INDICO_API || key.INDICO_API
var indicoHelper = require('./indicoHelper');


var client = new Twitter({
  consumer_key: process.env.API_KEY || key.API_KEY,
  consumer_secret: process.env.API_SECRET || key.API_SECRET,
  access_token_key: process.env.ACCESS_TOKEN || key.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET || key.ACCESS_TOKEN_SECRET
});

var app = express();
app.use(express.static(__dirname + '/../client/dist'));


app.get('/GET', (req, res) => {
  console.log('GET REQUEST');
  res.status(200);
  res.end("Hello San Francisco");
} )


var port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

app.get('/googlepics', (req,res) => {
	//Gets a location based on a long/latitude
	var locationData = req.query.lat + ', ' + req.query.lon; 
	axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {params : {key: (process.env.MAP_API || key.GOOGLE_MAP_API), location: locationData, radius :2000}})
	.then ((results) =>{
		//Pulls the first image information
		var photoString = results.data.results[0].photos[0].photo_reference;
		var imageUrl = 'https://maps.googleapis.com/maps/api/place/photo?maxheight=290&key=' + (process.env.MAP_API || key.GOOGLE_MAP_API) + '&photoreference=' + photoString;
		//Sends back a direct Url to reach the image.
		res.end(imageUrl)
	})
	.catch((error) =>{
		console.log(error)
		res.status(200);
		res.end('error')
	})

})

app.get('/walkscore', (req,res) => {
	var locationData = {lat: req.query.lat, lon :req.query.lon}
	axios.get('http://api.walkscore.com/score', {params: {lat: locationData.lat, lon: locationData.lon, wsapikey: (process.env.WALKSCORE_API || key.WALKSCORE_API), address: '', format:JSON}})
	.then ((results)=>{
		//console.log(results);
		//Returned value is a weird string, splitting it to get just the walk score out
		results.data = results.data.split(',')
		results.data[2] = results.data[2].split(': ')
		res.status(200);
		res.end(JSON.stringify(results.data[2][1]))
	})
	.catch((error)=>{
		console.log(error);
		res.status(200);
		res.end('error');
	})
})



app.get('/recentTweetsFrom', (req, res) => {
	var locationData = req.query.lat + ',' + req.query.lon + ',10mi'
	//couldnt figure out how to search for anything so i searched for tweets that dont contain sddsssjd
  client.get('search/tweets', {q: ' -sddsssjd', lang: 'en', count: '100', result_type: 'recent', geocode: locationData})
	  .then(function (tweets) {
	    var tweetArr = [];
	    tweets.statuses.map((val) => { tweetArr.push(val.text) });

	    //get indico score
	    indicoHelper.sendIndicoData(req, res, tweetArr);
	  })
	  .catch(function (error) {
	    throw error;
	  })
})

app.get('/oldTweetsFrom', (req, res) => {
	var locationData = req.query.lat + ',' + req.query.lon + ',10mi'
	var date = new Date();
	var oneWeekAgo = moment(date.setDate(date.getDate() - 7)).format().split('T')[0];
	//couldnt figure out how to search for anything so i searched for tweets that dont contain sddsssjd
  client.get('search/tweets', {q: `-sddsssjd until:${oneWeekAgo}`, lang: 'en', count: '100', result_type: 'recent', geocode: locationData})
	  .then(function (tweets) {
	    var tweetArr = [];
	    tweets.statuses.map((val) => { tweetArr.push(val.text) });

	    //get indico score
	    indicoHelper.sendIndicoData(req, res, tweetArr);
	  })
	  .catch(function (error) {
	    throw error;
	  })
})

app.get('/recentTweetsAbout', (req, res) => {
	var city = req.query.city;
	var cityShortName = req.query.cityShortName;

  client.get('search/tweets', {q: `${city} OR ${cityShortName}`, lang: 'en', count: '100', result_type: 'recent'})
	  .then(function (tweets) {
	    var tweetArr = [];
	    tweets.statuses.map((val) => { tweetArr.push(val.text) });

	    //get indico score
	    indicoHelper.sendIndicoData(req, res, tweetArr);
	  })
	  .catch(function (error) {
	    throw error;
	  })
})

app.get('/oldTweetsAbout', (req, res) => {
	var city = req.query.city;
	var cityShortName = req.query.cityShortName;
	var date = new Date();
	var oneWeekAgo = moment(date.setDate(date.getDate() - 7)).format().split('T')[0];

  client.get('search/tweets', {q: `${city} OR ${cityShortName} until:${oneWeekAgo}`, lang: 'en', count: '100', result_type: 'recent'})
	  .then(function (tweets) {
	    var tweetArr = [];
	    tweets.statuses.map((val) => { tweetArr.push(val.text) });

	    //get indico score
	    indicoHelper.sendIndicoData(req, res, tweetArr);
	  })
	  .catch(function (error) {
	    throw error;
	  })
})
