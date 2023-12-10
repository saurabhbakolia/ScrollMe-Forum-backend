import { Router } from 'express';
import * as UserController from '../controllers/UserController';
import * as ProfileController from '../controllers/ProfileController';
import { auth } from '../middlewares/Auth';
import * as TokenController from '../controllers/TokenController';

const userRouter: Router = Router();

// Your route definitions here
userRouter.post('/user/login', UserController.loginOne);
userRouter.post('/user/register', UserController.registerOne);
userRouter.post('/user/logout', auth, UserController.logoutOne);
userRouter.post('/user/create-profile', auth, ProfileController.createProfile);
userRouter.post('/user/edit-profile', auth, ProfileController.editProfile);
userRouter.post('/user/delete-profile', auth, ProfileController.deleteProfile);
userRouter.get('/user/get-userId', auth, UserController.getUser);
userRouter.post('/jwt/verify', auth, TokenController.verifyRefreshToken);
export default userRouter;
