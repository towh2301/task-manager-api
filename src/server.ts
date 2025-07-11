import express from "express";
import dotenv from "dotenv";
import { connectMongoDB } from "./configs/database";
import app from "./app";

// Config to use .env for the project
dotenv.config();

const PORT = process.env.PORT || 8081;

const startServer = async () => {
	await connectMongoDB();

	app.listen(PORT, () => {
		console.log(`🚀 Server running on http://localhost:${PORT}`);
		console.log(
			`Swagger UI available at http://localhost:${PORT}/api-docs`
		);
	});
};

startServer();
