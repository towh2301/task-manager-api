import dotenv from "dotenv";
import express, { Application } from "express";
import { BASE_URL } from "./constant/routes.constant";
import { authenticate } from "./middleware/authenticate.middleware";
import { errorHandler } from "./middleware/error-handler.middleware";
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";
import cookieParser from "cookie-parser";

import swaggerUi from "swagger-ui-express";
import swaggerSpecs from "./configs/swagger";

dotenv.config();

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// APIs docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Public routes
app.use(BASE_URL, authRouter);

// Protected routes
app.use(BASE_URL, authenticate, userRouter);

// Single protected endpoint
app.get(`${BASE_URL}/protected`, authenticate, (req, res) => {
	res.json({ message: "You are authorized", user: (req as any).user });
});

// Error handling middleware (phải để cuối cùng)
app.use(errorHandler);

export default app;
