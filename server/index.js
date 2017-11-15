var express = require('express');

var app = express();
var port = process.env.PORT || 5000
app.listen(port);
console.log('app is listening on 5000');

app.get('/', (req, res) => {
  res.status(200);
  res.end("Hello6");
} )