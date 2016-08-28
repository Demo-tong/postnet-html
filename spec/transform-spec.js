/**
 * Created by tong on 16-8-28.
 */
const supertest = require('supertest');
const app = require('../app');

const request = supertest(app);

describe('get', ()=> {
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
});