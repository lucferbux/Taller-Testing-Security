const request = require("supertest");

const app = require("../src/config/server/server").default;

const userJson = require("./fixtures/user.json");
const projectsJson = require("./fixtures/projects.json");
const newprojectJson = require("./fixtures/newproject.json");

/**
 * storing globals to access them in API requests
 */
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
      .send(newprojectJson)
      .set("Cookie", [`token=${global.token}`])
      .expect((res) => {
        res.status.should.equal(201);
        res.body.should.not.null;
        res.body._id.should.not.be.empty;
        res.body.title.should.equal(newprojectJson.title);
        res.body.description.should.equal(newprojectJson.description);
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
        res.body[3].title.should.equal(newprojectJson.title);
        res.body[3].description.should.equal(newprojectJson.description);
        res.body[3]._id.should.equal(global.update_id);
      })
      .end(done);
  });

  it("update a new project", (done) => {
    request(app)
      .put("/v1/projects/")
      .send({...newprojectJson, title: NEW_TITLE_UPDATE, _id: global.update_id})
      .set("Cookie", [`token=${global.token}`])
      .expect((res) => {
        res.status.should.equal(201);
        res.body.should.not.null;
        res.body._id.should.not.be.empty;
        res.body.title.should.equal(NEW_TITLE_UPDATE);
        res.body.description.should.equal(newprojectJson.description);
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
        res.body[3].description.should.equal(newprojectJson.description);
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
        res.status.should.equal(201);
        res.body.should.not.null;
        res.body._id.should.not.be.empty;
        res.body._id.should.equal(update_id);
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
