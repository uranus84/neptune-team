var mysql = require('mysql');

var connection = mysql.createConnection(process.env.JAWSDB_URL);

connection.connect(
  function(err) {
    if (err) { console.log('DATABASE CONNECTION ERROR!', err); }
    console.log('connected as id ' + connection.threadId);
  }
);


var addTipToDataBaseFn = function(info, cb) {
  connection.query(`INSERT INTO tipstable (city, state, name, tiptext) VALUES ("${info.cityData.toLowerCase()}", "${info.stateData.toLowerCase()}", "${info.nameData}", "${info.tipData}" );`, 
    function (err, rows, fields) {
      cb(err, rows.insertId);
    });
};


var getLocalTipsFromDataBaseFn = function (info, cb) {
  console.log('Database search FN ran looking for ', info.city, ' & ', info.state);
  connection.query(`SELECT * FROM tipstable WHERE city='${info.city}' AND state='${info.state}' AND status != 'rejected';`,
  //connection.query("SELECT * FROM tipstable WHERE city='san francisco' AND state='california';",
    function (err, rows, fields) {
      if (err) {
        cb(err, null);
      } else {
        cb(null, rows);
      }
    });
};

const getAllTips = (cb) => {
  connection.query('SELECT * FROM tipstable ORDER BY datecreated DESC', (err, rows, fields) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, rows);
    }
  });
};

const updateTipStatus = (tipId, status, cb) => {
  connection.query(`UPDATE tipstable SET status = ? WHERE ID = ${tipId}`, status, (err, rows, fields) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, rows);
    }
  });
};

const flagTip = (tipId, concern, cb) => {
  connection.query(`UPDATE tipstable SET status = "flagged", concern = ? WHERE ID = ${tipId}`, concern, (err, rows, fields) => {
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
module.exports.getAllTips = getAllTips;
module.exports.updateTipStatus = updateTipStatus;
module.exports.flagTip = flagTip;








