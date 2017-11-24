var express = require('express');
var axios = require('axios');
var key = require('./API.js');

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
	axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {params : {key: key.GOOGLE_MAP_API, location: locationData, radius :2000}})
	.then ((results) =>{
		//Pulls the first image information
		var photoString = results.data.results[0].photos[0].photo_reference;
		var imageUrl = 'https://maps.googleapis.com/maps/api/place/photo?maxheight=290&key=' + key.GOOGLE_MAP_API + '&photoreference=' + photoString;
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
	axios.get('http://api.walkscore.com/score', {params: {lat: 37.773972, lon: -122.431297, wsapikey: key.WALKSCORE_API, address: '', format:JSON}})
	.then ((results)=>{
		console.log(results);
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