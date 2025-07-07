import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import * as z from "zod/v4";
import { HttpStatus } from "@/enums/http-status.enum";
import { ApiResponse } from "@/types/api-response.type";
import { AppError } from "@/utils/app-error";

export const errorHandler: ErrorRequestHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let statusCode = HttpStatus.INTERNAL_SERVER_ERROR.code;
	let message = HttpStatus.INTERNAL_SERVER_ERROR.message;
	let errorDetail: any = undefined;

	if (err instanceof AppError) {
		statusCode = err.statusCode;
		message = err.message;
	} else if (err instanceof z.ZodError) {
		statusCode = 400;
		message = "Validation failed";
		errorDetail = z.treeifyError(err);
	} else {
		errorDetail = err.stack || err.message || String(err);
	}

	const response: ApiResponse<null> = {
		code: statusCode,
		success: false,
		message,
		error: process.env.NODE_ENV === "production" ? undefined : errorDetail,
	};

	console.error("[App Error]", err);

	res.status(statusCode).json(response);
};
