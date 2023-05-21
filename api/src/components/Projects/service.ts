import Joi from 'joi';
import ProjectModel, { IProjectsModel } from './model';
import ProjectsValidation from './validation';
import { IProjectsService } from './interface';
import { Types } from 'mongoose';

/**
 * @export
 * @implements {IProjectsModelService}
 */
const ProjectsService: IProjectsService = {
  /**
   * @returns {Promise < IProjectsModel[] >}
   * @memberof ProjectsService
   */
  async findAll(): Promise<IProjectsModel[]> {
    try {
      return await ProjectModel.find({});
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {string} id
   * @returns {Promise < IProjectsModel >}
   * @memberof ProjectsService
   */
  async findOne(id: string): Promise<IProjectsModel> {
    try {
      const validate: Joi.ValidationResult<{
        id: string;
      }> = ProjectsValidation.getProject({
        id
      });

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      return await ProjectModel.findOne(
        {
          _id: Types.ObjectId(id)
        },
        {
          password: 0
        }
      );
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {IProjectsModel} project
   * @returns {Promise < IProjectsModel >}
   * @memberof ProjectsService
   */
  async insert(body: IProjectsModel): Promise<IProjectsModel> {
    try {
      const validate: Joi.ValidationResult<IProjectsModel> = ProjectsValidation.createProject(body);

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      const project: IProjectsModel = await ProjectModel.create(body);

      return project;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {string} id
   * @returns {Promise < IProjectsModel >}
   * @memberof ProjectsService
   */
  async remove(id: string): Promise<IProjectsModel> {
    try {
      const validate: Joi.ValidationResult<{
        id: string;
      }> = ProjectsValidation.removeProject({
        id
      });

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      const project: IProjectsModel = await ProjectModel.findOneAndRemove({
        _id: Types.ObjectId(id)
      });

      return project;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export default ProjectsService;
