import { Router } from "express";
import { UserController } from "@/controllers/user.controller";

const userRouter = Router();
const userController = new UserController();

userRouter.get("/users", userController.getAllUser);
userRouter.get("/users/:id", userController.getUserById);

export default userRouter;
