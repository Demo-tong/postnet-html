/**
 * Created by tong on 16-8-28.
 */
const supertest = require('supertest');
const app = require('../app');

const request = supertest(app);

function doError(err, done) {
  if (err) {
    done.fail(err);
  } else {
    done();
  }
}

function sendRequest(router, cmd, expected, done) {
  request
    .get(`/express/${router}`)
    .query({cmd})
    .expect(expected)
    .end((err, res)=> {
      doError(err, done);
    })
}
describe('get/express/toBarcode', ()=> {
  it('should return correct result', (done)=> {
    const cmd = '12345';
    const expected = {
      error: '',
      data: '|:::||::|:|::||::|::|:|:|::|:|:| cd is 5'
    };
    sendRequest('toBarcode', cmd, expected, done);
  });

  it('should return error information', (done)=> {
    const cmd = '1234';
    const expected = {
      error: "the letter or the length of number is illegal(the length should be 5/9/10 contain' - ')",
      data: ''
    };
    sendRequest('toBarcode', cmd, expected, done);
  });
});

describe('get/express/toZipcode', ()=> {
  it('should return correct result', (done)=> {
    const cmd = '| :::|| ::|:| ::||: :|::| :|:|: :|:|: |';
    const expected = {
      error: '',
      data: '12345'
    };

    sendRequest('toZipcode', cmd, expected, done);
  });

  it('should return error of other word', (done)=> {
    const cmd = '| :::|| ::|:| ::||: :|::| :|:|: :::|| ::|:| ::||: :|::| :*|:: |';
    const expected = {
      error: "error input(only '|'':'' 'can be accepted and ' 'is must)",
      data: ''
    };

    sendRequest('toZipcode', cmd, expected, done);
  });

  it('should return error of digit check', (done)=> {
    const cmd = '| :::|| ::|:| ::||: :|::| :|:|: :|:|| |';
    const expected = {
      error: 'it has uncorrect checkdigit',
      data: ''
    };

    sendRequest('toZipcode', cmd, expected, done);
  });
});