var express = require('express');
var axios = require('axios');
var key = require('./API.js');
var emailExistence = require('email-existence');
var kickbox = require('kickbox').client('test_494fd5cef36eb0198c09bdd91974178fb639a5a2cfbb52b9e46942ce16ee49af').kickbox();
var bodyParser = require('body-parser')


var app = express();
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());


app.get('/GET', (req, res) => {
  //console.log('GET REQUEST');
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
		//console.log(error);
		res.status(200);
		res.end('error');
	})
})


app.post('/postTips', (req, res) => {
    res.status(201);
    console.log(req.body)

		var email = req.body.email;
		var content = req.body.content;
		var city = req.body.city;
		
		//must change this later 
		kickbox.verify(email, function (err, response) {
	  	if (response.body.result === 'deliverable') {
	  		console.log('this example email exists, so now we must store to database');
	  		//store the email, content and city into database

	  	}
		});
    res.end('successful store to DB');
})

//handle get request from server here for local Tips
//get the values that have city 
//return value to client






