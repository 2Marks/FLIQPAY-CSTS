import Joi from 'joi';
import { JoiValidationError } from './errors';

export const validate = <T>(data: T, schema: Joi.Schema): T => {
  const { error, value } = schema.validate(data);

  if (error) {
    throw new JoiValidationError('Error occurred during payload validation', error);
  }

  return value;
};
