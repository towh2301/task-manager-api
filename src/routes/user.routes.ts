import { Router } from "express";
import { UserController } from "@/controllers/user.controller";
import { updateUserData } from "@/validator/user/update-user.validator";
import { validate } from "@/middleware/validate.middleware";
import { authenticateJWT } from "@/middleware/auth.middleware";

const userRouter = Router();
const userController = new UserController();

userRouter.get("/users", userController.getAllUser);
userRouter.get("/users/:id", userController.getUserById);
userRouter.put(
	"/users/:id",
	validate(updateUserData),
	userController.updateUserById
);

export default userRouter;
