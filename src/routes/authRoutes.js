import { celebrate } from 'celebrate';
import { Router } from 'express';
import {
  loginUserSchema,
  registerUserSchema,
} from '../validations/authValidation.js';
import {
  loginUser,
  logoutUser,
  refreshUserSession,
  registerUser,
} from '../controllers/authController.js';

const authRouter = new Router();

authRouter.post('/auth/register', celebrate(registerUserSchema), registerUser);

authRouter.post('/auth/login', celebrate(loginUserSchema), loginUser);

authRouter.post('/auth/refresh', refreshUserSession);

authRouter.post('/auth/logout', logoutUser);

export default authRouter;
