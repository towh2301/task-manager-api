// src/config/swagger.ts
import swaggerJsdoc from "swagger-jsdoc";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

const options: swaggerJsdoc.Options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Task Manager API",
			version: "1.0.0",
			description: "API documentation for Task Manager backend",
		},
		servers: [
			{
				url: `http://localhost:${PORT}`,
			},
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: "http",
					scheme: "bearer",
					bearerFormat: "JWT",
				},
			},
		},
	},
	apis: ["./src/routes/**/*.ts"], // Add more if needed
};

const specs = swaggerJsdoc(options);

export default specs;
