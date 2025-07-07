import { Router } from "express";
import { UserController } from "@/controllers/user.controller";
import { validate } from "@/middleware/validate.middleware";
import { updateUserData } from "@/validator/user/update-user.validator";
import { registerUserSchema } from "@/validator/auth/register.validator";

const userRouter = Router();
const userController = new UserController();

userRouter.get("/users", userController.getAllUser);
userRouter.get("/users/:id", userController.getUserById);
userRouter.put(
	"/users/:id",
	validate(updateUserData),
	userController.updateUserById
);
userRouter.post(
	"/users/create",
	validate(registerUserSchema),
	userController.createUser
);

export default userRouter;
