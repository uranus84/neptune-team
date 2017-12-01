const mysql = require('mysql');
const request = require('request');
const expect = require('chai').expect;
const axios = require('axios');

describe('server', () => {
  describe('GET requests to /admin', () => {
    it('should respond with a 200 status code', (done) => {
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
      // insert a tip to db, return its id
      request({
        method: 'POST',
        uri: 'http://localhost:5000/tips',
        json: {
          cityData: 'san francisco',
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

  describe('GET requests to /tips', () => {
    it('should respond with a 200 status code', (done) => {
      request('http://localhost:5000/tips', (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it('should send back parsable stringified JSON', (done) => {
      request('http://localhost:5000/tips', (error, response, body) => {
        expect(JSON.parse.bind(this, body)).to.not.throw();
        done();
      });
    });

    it('should return only approved tips', (done) => {
      // should insert 2 tips to db, one approved and one rejected, then delete them after
      // but for now, this will test existing tips
      axios.get('http://localhost:5000/tips', { params: {
        city: 'san francisco',
        state: 'california'
      }})
        .then((response) => {
          expect(response.data).to.be.an('array');
          expect(response.data[0]).to.be.an('object');

          let rejectedTipsCount = 0;
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].status === 'rejected') { rejectedTipsCount++; }
          }
          expect(rejectedTipsCount).to.equal(0);
          done();
        })
        .catch(err => console.log(err));
    });
  });
});