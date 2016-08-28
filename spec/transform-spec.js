/**
 * Created by tong on 16-8-28.
 */
const supertest = require('supertest');
const app = require('../app');

const request = supertest(app);

describe('get/express/toBarcode', ()=> {
  it('should return correct result', (done)=> {
    const cmd = '12345';
    const expected = {
      error: '',
      data: '|:::||::|:|::||::|::|:|:|::|:|:| cd is 5'
    };

    request
      .get('/express/toBarcode')
      .query({cmd})
      .expect(expected)
      .end((err, res)=> {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      })
  });

  it('should return error information', (done)=> {
    const cmd = '1234';
    const expected = {
      error: "the letter or the length of number is illegal(the length should be 5/9/10 contain' - ')",
      data: ''
    };

    request
      .get('/express/toBarcode')
      .query({cmd})
      .expect(expected)
      .end((err, res)=> {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      })
  });
});

describe('get/express/toZipcode', ()=> {
  it('should return correct result', (done)=> {
    const cmd = '| :::|| ::|:| ::||: :|::| :|:|: :|:|: |';
    const expected = {
      error: '',
      data: '12345'
    };

    request
      .get('/express/toZipcode')
      .query({cmd})
      .expect(expected)
      .end((err, res)=> {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      })
  });
});