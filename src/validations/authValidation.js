import { Joi, Segments } from 'celebrate';
import { emailRegex } from '../constants/authConstants.js';

export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().pattern(emailRegex, 'Invalid email format').required(),
    password: Joi.string().required().min(8),
  }),
};

export const loginUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().pattern(emailRegex, 'Invalid email format').required(),
    password: Joi.string().required().min(8),
  }),
};
