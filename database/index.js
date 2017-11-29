var mysql = require('mysql');
var connection = mysql.createConnection(process.env.JAWSDB_URL);
//process.env.JAWSDB_URL

// {
//   host     : 'localhost',
//   user     : 'test789',
//   password : 'test789',
//   database : 'infomapptips'
// }

connection.connect(
  function(err) {
    if (err) { console.log('DATABASE CONNECTION ERROR!', err); }
    console.log('connected as id ' + connection.threadId);
  }
);


var addTipToDataBaseFn = function(info, cb) {
  if (info.cityData.length < 1) { info.cityData = 'NONE PROVIDED'; }
  if (info.stateData.length < 1) { info.stateData = 'NONE PROVIDED'; }
  if (info.nameData.length < 1) { info.nameData = 'NONE PROVIDED'; }
  if (info.tipData.length < 1) { info.tipData = 'NONE PROVIDED'; }
  connection.query(`INSERT INTO tipstable (city, state, name, tiptext) VALUES ("${info.cityData.toLowerCase()}", "${info.stateData.toLowerCase()}", "${info.nameData}", "${info.tipData}" );`, 
    function (err, rows, fields) {
      cb(err, rows);
    });
};


var getLocalTipsFromDataBaseFn = function (info, cb) {
  console.log('Database search FN ran looking for ', info.city, ' & ', info.state);
  connection.query(`SELECT * FROM tipstable WHERE city='${info.city}' AND state='${info.state}';`,
  //connection.query("SELECT * FROM tipstable WHERE city='san francisco' AND state='california';",
    function (err, rows, fields) {
      if (err) {
        cb(err, null);
      } else {
        cb(null, rows);
      }
    });
};


module.exports.connection = connection;
module.exports.addTipToDataBaseFn = addTipToDataBaseFn;
module.exports.getLocalTipsFromDataBaseFn = getLocalTipsFromDataBaseFn;








