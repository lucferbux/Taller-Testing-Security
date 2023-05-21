import request from "supertest";
import app from "../src/config/server/server";
import userJson from "./fixtures/user.json";
import aboutmeJson from "./fixtures/aboutme.json";

/**
 * storing globals to access them in API requests
 */
let global = {
  token: "",
  update_id: "",
}
global.token = "";
global.update_id = "";

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
