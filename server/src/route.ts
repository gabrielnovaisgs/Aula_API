import { Router } from "express";
import { UserController } from "./controller";
const userRouter = Router();

userRouter.get('/user/all', UserController.getAllUsers);
userRouter.post('/user', UserController.cadatrarUser);
userRouter.get('/user/count', UserController.countUsers);
userRouter.delete('/user/:id', UserController.deleteUser);
userRouter.get('/user/:id', UserController.getUserById);
userRouter.put('/user/:id', UserController.updateUser);

userRouter.post('/login', UserController.login);

userRouter.get('/admin', UserController.admin);
export default userRouter ;