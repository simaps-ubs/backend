import { Router } from 'express';

import UsersController from '../controller/UsersController';

const userRouter = Router();
const usersController = new UsersController();

userRouter.post('/', usersController.create);

export default userRouter;
