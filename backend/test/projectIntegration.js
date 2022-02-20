const request = require("supertest");

const app = require("../src/config/server/server").default;

const userJson = require("./fixtures/user.json");
const projectsJson = require("./fixtures/projects.json");
const newprojectJson = require("./fixtures/newproject.json");

// TODO: 10) Create Integration Tests for the Project API
