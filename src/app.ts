import express, { Application, ErrorRequestHandler } from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/error-handler.middleware";
import userRouter from "./routes/user.routes";
import { BASE_URL } from "./constant/routes.constant";
import authRouter from "./routes/auth.route";

dotenv.config();

const app: Application = express();

// Middlewares
app.use(express.json());

// App routers
app.use(BASE_URL, authRouter);
app.use(BASE_URL, userRouter);

app.use(errorHandler);

export default app;
