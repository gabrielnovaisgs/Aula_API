import { Router, Request, Response, NextFunction } from "express";
import { UserController } from "./controller";
const userRouter = Router();


const docs = (req: Request, res: Response, next: () => void) => {
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    next();
}


userRouter.get('/user/all', UserController.getAllUsers);
userRouter.get('/user/count', UserController.countUsers);
userRouter.get('/admin',docs, UserController.admin);
userRouter.get('/user/html', UserController.html);
userRouter.get('/user/:id', UserController.getUserById);

userRouter.post('/user', UserController.cadatrarUser);
userRouter.post('/login', UserController.login);
userRouter.delete('/user/:id', UserController.deleteUser);
userRouter.put('/user/:id', UserController.updateUser);


export default userRouter ;