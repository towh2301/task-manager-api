import { HttpStatus } from "@/enums/http-status.enum";
import { ApiResponse } from "@/types/api-response.type";
import { NextFunction, Request, Response } from "express";

export const authorize =
	(requiredPermissions: string[]) =>
	(req: Request, res: Response, next: NextFunction) => {
		try {
			const user = req.user;

			if (!user) {
				const response: ApiResponse<any> = {
					code: HttpStatus.UNAUTHORIZED.code,
					success: false,
					error: HttpStatus.UNAUTHORIZED.message,
				};
				res.status(401).json(response);
			}

			const permissions: string[] = user?.permissions || [];

			const hasPermission = permissions.some((perm) => {
				requiredPermissions.includes(perm);
			});

			if (!hasPermission) {
				const response: ApiResponse<any> = {
					code: HttpStatus.FORBIDDEN.code,
					success: false,
					error: HttpStatus.FORBIDDEN.message,
				};

				res.status(403).json(response);
			}

			next();
		} catch (error) {
			next(error);
		}
	};
