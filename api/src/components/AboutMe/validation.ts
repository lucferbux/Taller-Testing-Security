import Joi from 'joi';
import Validation from '@/components/validation';
import { IAboutMeModel } from './model';

/**
 * @export
 * @class AboutMeValidation
 * @extends Validation
 */
class AboutMeValidation extends Validation {
  /**
   * @param {IAboutMeModel} params
   * @returns {Joi.ValidationResult<IAboutMeModel >}
   * @memberof AboutMeValidation
   */
  createAboutMe(params: IAboutMeModel): Joi.ValidationResult<IAboutMeModel> {
    const schema: Joi.ObjectSchema = Joi.object().keys({
      name: Joi.string().required(),
      birthday: Joi.number().optional(),
      nationality: Joi.string().optional(),
      job: Joi.string().optional(),
      github: Joi.string().optional()
    });

    return schema.validate(params);
  }

  /**
   * @param {{ id: string }} body
   * @returns {Joi.ValidationResult<{ id: string }>}
   * @memberof AboutMeValidation
   */
  getAboutMe(body: { id: string }): Joi.ValidationResult<{
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
   * @memberof AboutMeValidation
   */
  removeAboutMe(body: { id: string }): Joi.ValidationResult<{
    id: string;
  }> {
    const schema: Joi.ObjectSchema = Joi.object().keys({
      id: this.customJoi.objectId().required()
    });

    return schema.validate(body);
  }
}

export default new AboutMeValidation();
