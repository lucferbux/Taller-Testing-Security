const chai = require('chai');
const request = require('supertest');
const app = require('../src/config/server/server').default;
const user = require('./fixtures/user.json');
chai.should();

/**
 * storing globals to access them in API requests
 */
global.token = '';
/**
 * Authentication tests
 */
describe('Authentication', () => {

    it('login to app', (done) => {
        request(app)
            .post('/auth/login')
            .type('form')
            .field({
                email: 'lucasfernandezaragon@gmail.com',
                password: 'patata',
            })
            .expect((res) => {
                res.status.should.equal(200);
                res.body.message.should.be.a('string');
            })
            .end(done);
    });

    // it('get authenticated user', (done) => {
    //     request(app)
    //         .get('/users/')
    //         .set('Authorization', global.bearerToken)
    //         .expect((res) => {
    //             res.status.should.equal(200);
    //             res.body.user.should.not.null;
    //             res.body.user.email.should.equal(user.email);
    //         })
    //         .end(done);
    // });
});
