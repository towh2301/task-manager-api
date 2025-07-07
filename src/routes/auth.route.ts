import { AuthController } from "@/controllers/auth.controller";
import { validate } from "@/middleware/validate.middleware";
import { registerUserSchema } from "@/validator/auth/register.validator";
import { Router } from "express";

const authRouter = Router();
const authController = new AuthController();

authRouter.post(
	"/register",
	validate(registerUserSchema),
	authController.registerUser
);

export default authRouter;
