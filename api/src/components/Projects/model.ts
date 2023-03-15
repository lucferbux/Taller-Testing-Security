import * as connections from '@/config/connection/connection';
import { Document, Schema } from 'mongoose';

/**
 * @export
 * @interface IProjectsRequest
 */
export interface IProjectsRequest {
  id: string;
  title: string;
}

/**
 * @export
 * @interface IProjectsModel
 * @extends {Document}
 */
export interface IProjectsModel extends Document {
  id: string;
  title: string;
  description: string;
  version: string;
  link: string;
  tag: string;
  timestamp: number;
}

export type AuthToken = {
  accessToken: string;
  kind: string;
};

const ProjectsSchema = new Schema<IProjectsModel>(
  {
    title: String,
    description: String,
    version: String,
    link: String,
    tag: String,
    timestamp: Number
  },
  {
    collection: 'projects',
    versionKey: false
  }
);

export default connections.db.model<IProjectsModel>('ProjectsModel', ProjectsSchema);
