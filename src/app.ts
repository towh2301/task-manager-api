import dotenv from "dotenv";
import express, { Application } from "express";
import { BASE_URL } from "./constant/routes.constant";
import { authenticateJWT } from "./middleware/authenticate.middleware";
import { errorHandler } from "./middleware/error-handler.middleware";
import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.routes";
import cookieParser from "cookie-parser";

dotenv.config();

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Public routes
app.use(BASE_URL, authRouter);

// Protected routes
app.use(BASE_URL, authenticateJWT, userRouter);

// Single protected endpoint
app.get(`${BASE_URL}/protected`, authenticateJWT, (req, res) => {
	res.json({ message: "You are authorized", user: (req as any).user });
});

// Error handling middleware (phải để cuối cùng)
app.use(errorHandler);

export default app;
