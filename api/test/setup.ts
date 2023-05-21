import AuthService from "../src/components/Auth/service";
import AboutMeModel from "../src/components/AboutMe/model";
import ProjectModel from "../src/components/Projects/model";
import { db } from "../src/config/connection/connection";
import user from "./fixtures/user.json";
import aboutme from "./fixtures/aboutme.json";
import projects from "./fixtures/projects.json";
import chai from "chai";
import { before } from "mocha";


// Assertion style
chai.should();

before("setup database", async () => {
  try {
    db.dropDatabase();
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
