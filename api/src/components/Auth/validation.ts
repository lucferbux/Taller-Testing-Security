import Joi from 'joi';
import Validation from '@/components/validation';
import { IUserModel } from '@/components/User/model';
import { DocumentDefinition } from 'mongoose';

/**
 * @export
 * @class AuthValidation
 * @extends Validation
 */
class AuthValidation extends Validation {
  /**
   * @param {IUserModel} params
   * @returns {Joi.ValidationResult<IUserModel >}
   * @memberof UserValidation
   */
  createUser(params: DocumentDefinition<IUserModel>): Joi.ValidationResult<IUserModel> {
    const schema: Joi.ObjectSchema = Joi.object().keys({
      password: Joi.string().required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2
        })
        .required()
    });

    return schema.validate(params);
  }

  /**
   * @param {IUserModel} params
   * @returns {Joi.ValidationResult<IUserModel >}
   * @memberof UserValidation
   */
  getUser(params: IUserModel): Joi.ValidationResult<IUserModel> {
    const schema: Joi.ObjectSchema = Joi.object().keys({
      password: Joi.string().required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2
        })
        .required()
    });

    return schema.validate(params);
  }
}

export default new AuthValidation();
