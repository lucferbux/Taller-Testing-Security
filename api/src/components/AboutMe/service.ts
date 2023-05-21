import Joi from 'joi';
import AboutMeModel, { IAboutMeModel } from './model';
import AboutMeValidation from './validation';
import { IAboutMeService } from './interface';
import { Types } from 'mongoose';

/**
 * @export
 * @implements {IAboutMeModelService}
 */
const AboutMeService: IAboutMeService = {
  /**
   * @returns {Promise < IAboutMeModel[] >}
   * @memberof AboutMeService
   */
  async findAll(): Promise<IAboutMeModel> {
    try {
      const result = await AboutMeModel.find({});
      if (result.length > 0) {
        return result[0];
      } else {
        throw new Error('empty search');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {string} id
   * @returns {Promise < IAboutMeModel >}
   * @memberof AboutMeService
   */
  async findOne(id: string): Promise<IAboutMeModel> {
    try {
      const validate: Joi.ValidationResult<{
        id: string;
      }> = AboutMeValidation.getAboutMe({
        id
      });

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      return await AboutMeModel.findOne(
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
   * @param {IAboutMeModel} user
   * @returns {Promise < IAboutMeModel >}
   * @memberof AboutMeService
   */
  async insert(body: IAboutMeModel): Promise<IAboutMeModel> {
    try {
      const validate: Joi.ValidationResult<IAboutMeModel> = AboutMeValidation.createAboutMe(body);

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      const user: IAboutMeModel = await AboutMeModel.create(body);

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {string} id
   * @returns {Promise < IAboutMeModel >}
   * @memberof AboutMeService
   */
  async remove(id: string): Promise<IAboutMeModel> {
    try {
      const validate: Joi.ValidationResult<{
        id: string;
      }> = AboutMeValidation.removeAboutMe({
        id
      });

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      const user: IAboutMeModel = await AboutMeModel.findOneAndRemove({
        _id: Types.ObjectId(id)
      });

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export default AboutMeService;
