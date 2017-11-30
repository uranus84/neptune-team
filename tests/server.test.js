const mysql = require('mysql');
const request = require('request');
const expect = require('chai').expect;
const axios = require('axios');

describe('server', () => {
  describe('GET requests to /admin', () => {
    it('should respond to GET requests for /admin with a 200 status code', (done) => {
      request('http://localhost:5000/admin', (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it('should send back parsable stringified JSON', (done) => {
      request('http://localhost:5000/admin', (error, response, body) => {
        expect(JSON.parse.bind(this, body)).to.not.throw();
        done();
      });
    });

    it('should send back all tips from the db', (done) => {
      request('http://localhost:5000/admin', (error, response, body) => {
        const parsedBody = JSON.parse(body);
        expect(parsedBody).to.be.an('array');
        expect(parsedBody[0]).to.be.an('object');
        done();
      });
    });
  });

  describe('DELETE requests to /admin', () => {
    it('should delete a tip from the database', (done) => {
      console.log('inside delete');
      // insert a tip to db, return its id
      request({
        method: 'POST',
        uri: 'http://localhost:5000/tips',
        json: {
          cityData: 'berkeley',
          stateData: 'california',
          nameData: 'amy',
          tipData: 'test tip information'
        }
      }, (error, response, postBody) => {
        if (error) {
          console.log(error);
        } else {
          // send delete request with that tip's id
          request({
            method: 'DELETE', 
            uri: 'http://localhost:5000/admin',
            json: {
              tipId: postBody
            }
          }, (err, res, deleteBody) => {
            // a better approach would be to query the db directly for the tip with that id
            expect(deleteBody).to.equal(`tip ${postBody} deleted`);
            done();
          });
        }
      });
    });
  });
});