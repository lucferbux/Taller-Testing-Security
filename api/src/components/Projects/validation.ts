import Joi from 'joi';
import Validation from '@/components/validation';
import { IProjectsModel } from './model';

/**
 * @export
 * @class ProjectsValidation
 * @extends Validation
 */
class ProjectsValidation extends Validation {
  /**
   * @param {IProjectsModel} params
   * @returns {Joi.ValidationResult<IProjectsModel >}
   * @memberof ProjectsValidation
   */
  createProject(params: IProjectsModel): Joi.ValidationResult<IProjectsModel> {
    const schema: Joi.ObjectSchema = Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().optional(),
      version: Joi.string().optional(),
      link: Joi.string().optional(),
      tag: Joi.string().optional(),
      timestamp: Joi.number().optional()
    });

    return schema.validate(params);
  }

  /**
   * @param {{ id: string }} body
   * @returns {Joi.ValidationResult<{ id: string }>}
   * @memberof ProjectsValidation
   */
  getProject(body: { id: string }): Joi.ValidationResult<{
    id: string;
  }> {
    const schema: Joi.ObjectSchema = Joi.object().keys({
      id: this.customJoi.objectId().required()
    });

    return schema.validate(body);
  }

  /**
   * @param {{ id: string }} body
   * @returns {Joi.ValidationResult<{ id: string }>}
   * @memberof ProjectsValidation
   */
  removeProject(body: { id: string }): Joi.ValidationResult<{
    id: string;
  }> {
    const schema: Joi.ObjectSchema = Joi.object().keys({
      id: this.customJoi.objectId().required()
    });

    return schema.validate(body);
  }
}

export default new ProjectsValidation();
