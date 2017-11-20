var express = require('express');

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