import { Router } from "express";
import { UserController } from "@/controllers/user.controller";
import { updateUserData } from "@/validator/user/update-user.validator";
import { validate } from "@/middleware/validate.middleware";
import { authenticate } from "@/middleware/authenticate.middleware";
import { authorize } from "@/middleware/authorize.middleware";
import { adminPermissions } from "@/constant/permission.constant";

const userRouter = Router();
const userController = new UserController();

userRouter.get(
	"/users",
	authenticate,
	authorize(adminPermissions),
	userController.getAllUser
);
userRouter.get(
	"/users/:id",
	authenticate,
	authorize(adminPermissions),
	userController.getUserById
);
userRouter.put(
	"/users/:id",
	authenticate,
	validate(updateUserData),
	userController.updateUserById
);

export default userRouter;
