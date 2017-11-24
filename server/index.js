var express = require('express');
var db = require('../database/index.js');
var bodyParser = require('body-parser');
var queryString = require('query-string');

var app = express();
app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/GET', (req, res) => {
  console.log('GET REQUEST');
  res.status(200);
  res.end("Hello San Francisco");
})


var port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log(`listening on port ${port}`);
});


app.post('/tips', (req, res)=> {
  console.log('CLIENT REQ TO SERVER POST @ /tips = ', req.body);
  db.addTipToDataBaseFn(req.body, (err, data) => { 
    if (err) {
      console.log('Error in POST to /tips = ', err)
    }; 
      res.send();
  });
})


app.get('/tips', (req, res) => {
  console.log('CLIENT REQ TO SERVER GET @ /tips = ', req.query);
  db.getLocalTipsFromDataBaseFn(req.query, (err, info) => {
      if (err) { 
        console.log('Error in GET to /tips', err);
      } else {
        console.log('INFO ABOUT TO BE SENT ON GET = ', info)
        res.send(info);
      }
  });
});




