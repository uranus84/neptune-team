const mysql = require('mysql');
const request = require('request');
const expect = require('chai').expect;

describe('server', () => {
  describe('GET requests to /admin', () => {
    it('should respond to GET requests for /admin with a 200 status code', (done) => {
      request('/admin', (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it('should send back parsable stringified JSON', (done) => {
      request('/admin', (error, response, body) => {
        expect(JSON.parse.bind(this, body)).to.not.throw();
        done();
      });
    });

    it('should send back all tips from the db', (done) => {
      request('/admin', (error, response, body) => {
        const parsedBody = JSON.parse(body);
        expect(parsedBody).to.be.an('object');
        expect(parsedBody.tips).to.be.an('array');
        done();
      });
    });
  });

  describe('DELETE requests to /admin', () => {
    // not sure this test is written correctly, but the general idea is sketched in comments
    it('should delete a tip from the database', (done) => {
      let dbConnection = mysql.createConnection({
        // TODO: change the user and password depending on the testing environment
        // run the schema file located at root/database/database.sql first;
        user: 'root', 
        password: '',
        database: 'infomapptips',
      });
      dbConnection.connect();
      // insert a tip to db, return its id
      dbConnection.query('INSERT INTO tipstable (city, state, name, tiptext) VALUES ("san francisco", "california", "James Dean", "Be sure to see the Golden Gate park");', (err, insertRow) => {
        // send delete request with that tip's id
        const requestParams = {
          method: 'DELETE', 
          uri: '/admin',
          json: {
            id: insertRow.insertId
          }
        };
        request(requestParams, (error, response, body) => {
          // query db for that tip, should return nothing
          dbConnection.query(`SELECT * FROM tipstable WHERE id = ${insertRow.insertId}`, (error, queryRows) => {
            expect(queryRows.length).to.equal(0);
          });
        });
      });
    });
  });
});
