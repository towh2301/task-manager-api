import { Request, Response, NextFunction, RequestHandler } from "express";
import * as z from "zod/v4";

export const validate = (
	schema: z.ZodObject<any, any>,
	target: "body" | "query" | "params" = "body"
): RequestHandler => {
	const handler: RequestHandler = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const result = await schema.safeParseAsync(req[target]);

		if (!result.success) {
			res.status(400).json({
				success: false,
				errors: result.error.flatten(),
			});
			return;
		}

		req[target] = result.data;
		next();
	};

	return handler;
};
