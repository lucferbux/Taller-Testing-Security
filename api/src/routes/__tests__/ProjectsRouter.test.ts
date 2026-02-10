/** @jest-environment node */
import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import type { IProjectsModel } from '@/components/Projects/model';
import { validProject, invalidProjects } from '../../tests/fixtures/projects';
import { buildProject, resetProjectFactory } from '../../tests/factories/projectFactory';

// Bypass auth middleware for tests
jest.mock('@/config/middleware/jwtAuth', () => ({
  isAuthenticated: (_req: unknown, _res: unknown, next: () => void) => next()
}));

let app: import('express').Application;
let ProjectModel: mongoose.Model<IProjectsModel>;
let mongo: MongoMemoryServer;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  process.env.NODE_ENV = 'test';
  process.env.MONGODB_URI = uri; // includes db name
  process.env.MONGODB_DB_MAIN = '';

  const serverModule = await import('../../config/server/server');
  app = serverModule.default;
  const modelModule = await import('../../components/Projects/model');
  ProjectModel = modelModule.default;

  await new Promise<void>((resolve) => {
    ProjectModel.db.once('open', () => resolve());
  });
});

beforeEach(async () => {
  await ProjectModel.deleteMany({});
  resetProjectFactory();
});

afterAll(async () => {
  await ProjectModel.db.close();
  await mongoose.disconnect();
  await mongo.stop();
});

describe('ProjectsRouter', () => {
  it('GET /v1/projects/:id - proyecto existente', async () => {
    const created = await ProjectModel.create(buildProject());

    const res = await request(app).get(`/v1/projects/${created._id.toString()}`);

    expect(res.status).toBe(200);
    expect(res.body.title).toBe(created.title);
    expect(res.body.description).toBe(created.description);
    expect(res.body._id).toBe(String(created._id));
  });

  it('GET /v1/projects/:id - proyecto inexistente', async () => {
    const fakeId = new mongoose.Types.ObjectId().toHexString();

    const res = await request(app).get(`/v1/projects/${fakeId}`);

    expect(res.status).toBe(404);
    const message = res.body?.message || res.text;
    expect(message).toMatch(/not found/i);
  });

  it('POST /v1/projects - crear proyecto válido', async () => {
    const payload = validProject;

    const res = await request(app).post('/v1/projects').send(payload);

    expect(res.status).toBe(201);
    expect(res.body._id).toBeDefined();
    expect(res.body.title).toBe(payload.title);

    const inDb = await ProjectModel.findOne({ title: payload.title }).lean();
    expect(inDb).toBeTruthy();
    expect(inDb?.description).toBe(payload.description);
  });

  it('POST /v1/projects - datos inválidos', async () => {
    const payload = invalidProjects.noTitle;

    const res = await request(app).post('/v1/projects').send(payload);

    expect(res.status).toBe(400);
    const message = res.body?.message || res.text;
    expect(message).toMatch(/title/i);
  });
});
