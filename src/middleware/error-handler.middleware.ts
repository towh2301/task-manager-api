import { HttpStatus } from "@/enums/http-status.enum";
import { ApiResponse } from "@/types/api-response.type";
import { AppError } from "@/utils/app-error";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const status = HttpStatus;

	let statusCode = status.INTERNAL_SERVER_ERROR.code;
	let message = HttpStatus.INTERNAL_SERVER_ERROR.message;

	if (err instanceof AppError) {
		statusCode = err.statusCode;
		message = err.message;
	}

	const response: ApiResponse<null> = {
		code: err.HttpStatus,
		success: false,
		message: err.message || "Internal Server Error",
		error: process.env.NODE_ENV === "production" ? undefined : err.name,
	};

	console.error("[App Error]", err);

	res.status(statusCode).json(response);
};
