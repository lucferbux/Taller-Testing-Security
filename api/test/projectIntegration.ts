import request from "supertest";
import app from "../src/config/server/server";
import userJson from "./fixtures/user.json";
import projectsJson from "./fixtures/projects.json";
import newProjectsJson from "./fixtures/newproject.json";

/**
 * storing globals to access them in API requests
 */
let global = {
  token: "",
  update_id: "",
}
global.token = "";
global.update_id = "";

const NEW_TITLE_UPDATE = "React Internationalization";

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

  it("get project info", (done) => {
    request(app)
      .get("/v1/projects/")
      .expect((res) => {
        res.status.should.equal(200);
        res.body.should.not.null; 
        res.body.length.should.equal(3);    
        res.body[0].title.should.equal(projectsJson[0].title);
        res.body[0].description.should.equal(projectsJson[0].description);
        res.body[2].title.should.equal(projectsJson[2].title);
        res.body[2].description.should.equal(projectsJson[2].description);
      })
      .end(done);
  });

  it("add a new project", (done) => {
    request(app)
      .post("/v1/projects/")
      .send(newProjectsJson)
      .set("Cookie", [`token=${global.token}`])
      .expect((res) => {
        res.status.should.equal(201);
        res.body.should.not.null;
        res.body._id.should.not.be.empty;
        res.body.title.should.equal(newProjectsJson.title);
        res.body.description.should.equal(newProjectsJson.description);
        global.update_id = res.body._id;
      })
      .end(done);
  });

  it("ensure new project is retrieve", (done) => {
    request(app)
      .get("/v1/projects/")
      .expect((res) => {
        res.status.should.equal(200);
        res.body.should.not.null; 
        res.body.length.should.equal(4);    
        res.body[3].title.should.equal(newProjectsJson.title);
        res.body[3].description.should.equal(newProjectsJson.description);
        res.body[3]._id.should.equal(global.update_id);
      })
      .end(done);
  });

  it("update a new project", (done) => {
    request(app)
      .put("/v1/projects/")
      .send({...newProjectsJson, title: NEW_TITLE_UPDATE, _id: global.update_id})
      .set("Cookie", [`token=${global.token}`])
      .expect((res) => {
        res.status.should.equal(201);
        res.body.should.not.null;
        res.body._id.should.not.be.empty;
        res.body.title.should.equal(NEW_TITLE_UPDATE);
        res.body.description.should.equal(newProjectsJson.description);
        global.update_id = res.body._id;
      })
      .end(done);
  });

  it("ensure project updated is retrieve", (done) => {
    request(app)
      .get("/v1/projects/")
      .expect((res) => {
        res.status.should.equal(200);
        res.body.should.not.null; 
        res.body.length.should.equal(4);    
        res.body[3].title.should.equal(NEW_TITLE_UPDATE);
        res.body[3].description.should.equal(newProjectsJson.description);
        res.body[3]._id.should.equal(global.update_id);
      })
      .end(done);
  });

  it("delete project", (done) => {
    request(app)
      .delete("/v1/projects/")
      .send({id: global.update_id})
      .set("Cookie", [`token=${global.token}`])
      .expect((res) => {
        res.status.should.equal(200);
        res.body.should.not.null;
        res.body._id.should.not.be.empty;
        res.body._id.should.equal(global.update_id);
      })
      .end(done);
  });


  it("ensure project deleted is not present", (done) => {
    request(app)
      .get("/v1/projects/")
      .expect((res) => {
        res.status.should.equal(200);
        res.body.should.not.null; 
        res.body.length.should.equal(3);    
        res.body[0].title.should.equal(projectsJson[0].title);
        res.body[0].description.should.equal(projectsJson[0].description);
        res.body[2].title.should.equal(projectsJson[2].title);
        res.body[2].description.should.equal(projectsJson[2].description);
      })
      .end(done);
  });

  
});
