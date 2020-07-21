import Joi from 'joi';

export const createSupportRequestSchema = Joi.object({
  subject: Joi.string().required(),
  description: Joi.string().required(),
});

export const getAllSupportRequestsSchema = Joi.object({
  page: Joi.number().default(1),
  perPage: Joi.number().default(10),
  searchQuery: Joi.string().optional(),
});

export const getOneSupportRequestSchema = Joi.object({
  id: Joi.string().required(),
});

export const addCommentSchema = Joi.object({
  supportRequestId: Joi.string().required(),
  comment: Joi.string().required().min(5),
});

export const getSupportRequestCommentSchema = Joi.object({
  supportRequestId: Joi.string().required(),
});

export const closeSupportRequestSchema = Joi.object({
  supportRequestId: Joi.string().required(),
});

export const exportClosedSupportRequestsSchema = Joi.object({
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
});
