import { AuthController } from "@/controllers/auth.controller";
import { validate } from "@/middleware/validate.middleware";
import { loginSchema } from "@/validator/auth/login.validator";
import { registerUserSchema } from "@/validator/auth/register.validator";
import { Router } from "express";

const authRouter = Router();
const authController = new AuthController();

authRouter.post(
	"/auth/register",
	validate(registerUserSchema),
	authController.registerUser
);
authRouter.post("/auth/logout", authController.logout);
authRouter.post("/auth/login", validate(loginSchema), authController.login);
authRouter.post("/auth/refresh", authController.refresh);

export default authRouter;
