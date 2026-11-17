import { Router } from 'express';
import { getCurrentUserController, loginController, registerController } from '../controllers/auth.controller.js';
import { authenticate } from '../middlewares/authenticate.middleware.js';
import { requireJson } from '../middlewares/require-json.middleware.js';
import { authRateLimiter } from '../middlewares/security.middleware.js';
import { validateLogin, validateRegister } from '../middlewares/validate-auth.middleware.js';

export const authRouter = Router();
authRouter.use(authRateLimiter);
authRouter.post('/register', requireJson, validateRegister, registerController);
authRouter.post('/login', requireJson, validateLogin, loginController);
authRouter.get('/me', authenticate, getCurrentUserController);
