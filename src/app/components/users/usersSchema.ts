import Joi from 'joi';

export const createUserSchema = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(5),
  roles: Joi.array().items(Joi.string().required()).required(),
});

export const getAllUsersSchema = Joi.object({
  page: Joi.number().default(1),
  perPage: Joi.number().default(10),
  searchQuery: Joi.string().optional(),
});

export const getOneUserSchema = Joi.object({
  id: Joi.string().required(),
});
