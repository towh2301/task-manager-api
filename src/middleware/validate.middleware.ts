import { Request, Response, NextFunction, RequestHandler } from "express";
import { ZodObject } from "zod/v4";

export const validate = (
	schema: ZodObject<any, any>,
	target: "body" | "query" | "params" = "body"
): RequestHandler => {
	const handler: RequestHandler = (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const result = schema.safeParse(req[target]);

		if (!result.success) {
			res.status(400).json({
				success: false,
				errors: result.error.message,
			});
			return;
		}

		(req as any)[target] = result.data;
		next();
	};

	return handler;
};
