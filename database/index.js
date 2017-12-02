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

const updateTipStatus = (tipId, status, concern, cb) => {
  if (concern) {
    connection.query(`UPDATE tipstable SET status = ?, concern = "${concern}" WHERE ID = ${tipId}`, status, (err, rows, fields) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, rows);
      }
    });
  } else {
    connection.query(`UPDATE tipstable SET status = ? WHERE ID = ${tipId}`, status, (err, rows, fields) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, rows);
      }
    });
  }
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

var adminLogin = function (facebookId, cb) {
  // console.log('Trying to login');
  connection.query(`SELECT * FROM moderators WHERE user_id='${facebookId}';`,
    function(err, admin) {
      if (err) {
        cb(err, null);
      } else if (admin.length === 0) {
        cb(null, false);
      } else {
        cb(null, true);
      }
    });
};

module.exports.connection = connection;
module.exports.addTipToDataBaseFn = addTipToDataBaseFn;
module.exports.getLocalTipsFromDataBaseFn = getLocalTipsFromDataBaseFn;
module.exports.getAllTips = getAllTips;
module.exports.updateTipStatus = updateTipStatus;
module.exports.flagTip = flagTip;
module.exports.deleteTip = deleteTip;
module.exports.isAdmin = adminLogin;
