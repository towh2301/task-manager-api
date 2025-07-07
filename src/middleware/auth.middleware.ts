import { HttpStatus } from "@/enums/http-status.enum";
import { ApiResponse } from "@/types/api-response.type";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;

export const authenticateJWT = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	const authHeader = req.headers.authorization;

	if (!authHeader?.startsWith("Bearer ")) {
		const response: ApiResponse<any> = {
			code: HttpStatus.INVALID_ACCESS_TOKEN.code,
			success: false,
			error: HttpStatus.INVALID_ACCESS_TOKEN.message,
		};
		res.status(401).json(response);
		return;
	}

	const token = authHeader.split(" ")[1] || "";

	try {
		const user = jwt.verify(token, ACCESS_TOKEN_SECRET);
		(req as any).user = user;
		next();
	} catch (err) {
		next(err);
	}
};
