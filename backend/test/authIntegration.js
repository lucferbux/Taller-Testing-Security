const request = require("supertest");

const app = require("../src/config/server/server").default;

const user = require("./fixtures/user.json");

/**
 * storing globals to access them in API requests
 */
 global.token = "";

describe("Authentication Integration Test", () => {
  it("login form", (done) => {
    request(app)
      .post("/auth/login")
      .type("form")
      .send(user)
      .expect((res) => {
        res.status.should.equal(200);
        res.body.token.should.be.a("string");
        global.token = res.body.token;
      })
      .end(done);
  });

  it("get authenticated user", (done) => {
    request(app)
      .get("/v1/users/")
      .set("Cookie", [`token=${global.token}`])
      .expect((res) => {
        res.status.should.equal(200);
        res.body.should.not.null;
        res.body.length.should.be.above(0);
        res.body[0].email.should.equal(user.email);
      })
      .end(done);
  });

  it("logout auth", (done) => {
    request(app)
      .post("/auth/logout")
      .expect((res) => {
        res.status.should.equal(200);
        res.body.message.should.be.a("string");
      })
      .end(done);
  });
});
