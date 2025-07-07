import mongoose from "mongoose";
import dotenv from "dotenv";

// Config to use .env for the project
dotenv.config();

const MONGO_URL: string = process.env.MONGO_URL?.toString() || "";

export const connectMongoDB = async (): Promise<void> => {
	try {
		await mongoose.connect(MONGO_URL);
		console.log("Database connected successfully");
	} catch (error) {
		console.error("Connect to MONGO failed: ", error);
		process.exit(1); // Stop if there is an error
	}
};
