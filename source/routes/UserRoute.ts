import { Router } from 'express';
import * as UserController from '../controllers/UserController';
import * as ProfileController from '../controllers/ProfileController';
import { auth } from '../middlewares/Auth';

const userRouter: Router = Router();

// Your route definitions here
userRouter.post('/user/login', UserController.loginOne);
userRouter.post('/user/register', UserController.registerOne);
userRouter.post('/user/logout', auth, UserController.logoutOne);
userRouter.post('/user/create-profile', auth, ProfileController.createProfile);
userRouter.post('/user/edit-profile', auth, ProfileController.editProfile);
userRouter.post('/user/delete-profile', auth, ProfileController.deleteProfile);
userRouter.get('/user/get-userId', auth, UserController.getUser);
export default userRouter;
