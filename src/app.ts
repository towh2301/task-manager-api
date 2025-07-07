import express, { Application, ErrorRequestHandler } from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/error-handler.middleware";
import userRouter from "./routes/user.routes";

dotenv.config();

const app: Application = express();

// Middlewares
app.use(express.json());

// App routers
app.use("/api/v1", userRouter);

app.use(errorHandler);

export default app;
