import { HttpStatus } from "@/enums/http-status.enum";
import { ApiResponse } from "@/types/api-response.type";
import { AppError } from "@/utils/app-error";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import * as z from "zod/v4";

export const errorHandler: ErrorRequestHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let statusCode = HttpStatus.INTERNAL_SERVER_ERROR.code;
	let message = HttpStatus.INTERNAL_SERVER_ERROR.message;
	let errorDetail: any = undefined;
	let errorCode = 400;

	if (err instanceof AppError) {
		statusCode = err.statusCode;
		errorCode = err.errorCode;
		message = err.message;
	} else if (err instanceof z.ZodError) {
		statusCode = 400;
		message = "Validation failed";
		errorDetail = z.treeifyError(err);
	} else {
		errorDetail = err.stack || err.message || String(err);
	}

	const response: ApiResponse<null> = {
		code: errorCode,
		success: false,
		message,
		error: process.env.NODE_ENV === "production" ? undefined : errorDetail,
	};

	console.error("[App Error]", err);

	res.status(statusCode).json(response);
};
