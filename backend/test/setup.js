const UserModel = require("../src/components/User/model").default;
const ProjectModel = require("../src/components/Projects/model").default;
const AboutMeModel = require("../src/components/AboutMe/model").default;
const AuthService = require("../src/components/Auth/service").default;


const user = require("./fixtures/user.json");
const aboutme = require("./fixtures/aboutme.json");
const projects = require("./fixtures/projects.json");

const chai = require("chai");

// Assertion style
chai.should();

before("setup database", async () => {
  try {
    await UserModel.deleteMany({});
    await ProjectModel.deleteMany({});
    await AboutMeModel.deleteMany({});
  } catch (error) {
    console.error("Error Deletion AboutMe API Test");
    console.error(error);
  }

  try {
    await AuthService.createUser(user);
    await AboutMeModel.create(aboutme);
    await ProjectModel.create(projects);
  } catch (error) {
    console.error("Error Insertion AboutMe API Test");
    console.error(error);
  }
});
