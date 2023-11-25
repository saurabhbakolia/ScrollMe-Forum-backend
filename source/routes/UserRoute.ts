import { Router } from 'express';
import * as UserController from '../controllers/UserController';
import { auth } from '../middlewares/Auth';

const userRouter: Router = Router();

// Your route definitions here
userRouter.post('/user/login', auth, UserController.loginOne);
userRouter.post('/user/register', UserController.registerOne);
export default userRouter;
