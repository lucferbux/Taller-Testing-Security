const request = require("supertest");

const app = require("../src/config/server/server").default;

const userJson = require("./fixtures/user.json");
const aboutmeJson = require("./fixtures/aboutme.json");


/**
 * storing globals to access them in API requests
 */
global.token = "";

/**
 * AboutMe API tests
 */
describe("AboutMe API Tests", () => {

  before("get cookie", async () => {
    try {
      let response = await request(app)
        .post("/auth/login")
        .type("form")
        .send(userJson);
      global.token = response.body.token;
    } catch (error) {
      console.error("Error getting cookie AboutMe API Test");
      console.log(error);
    }
  });

  it("get aboutme info", (done) => {
    request(app)
      .get("/v1/aboutMe/")
      .expect((res) => {
        res.status.should.equal(200);
        res.body.should.not.null;     
        res.body.name.should.equal(aboutmeJson[0].name);
        res.body.nationality.should.equal(aboutmeJson[0].nationality);
      })
      .end(done);
  });

  
});
