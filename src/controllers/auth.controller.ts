import { AuthService } from "./../services/auth/auth.service";
import { HttpStatus } from "@/enums/http-status.enum";
import { IUser } from "@/models/user.model";
import { ApiResponse } from "@/types/api-response.type";
import { registerUserSchema } from "@/validator/auth/register.validator";
import { NextFunction, Request, Response } from "express";
import z from "zod/v4";

export class AuthController {
	private authService: AuthService;

	constructor() {
		this.authService = new AuthService();
		this.registerUser = this.registerUser.bind(this);
	}

	registerUser = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const userRegisterData: z.infer<typeof registerUserSchema> =
				req.body;

			const newUser = await this.authService.register({
				...userRegisterData,
			});

			const response: ApiResponse<IUser> = {
				code: HttpStatus.USER_CREATED_SUCCESSFULLY.code,
				success: true,
				data: newUser as IUser,
				message: HttpStatus.USER_CREATED_SUCCESSFULLY.message,
			};

			res.status(HttpStatus.OK.code).json(response);
		} catch (err) {
			next(err);
		}
	};

	getUserById = async (req: Request, res: Response, next: NextFunction) => {
		try {
		} catch (err: any) {
			next(err);
		}
	};

	updateUserById = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
		} catch (err: any) {
			next(err);
		}
	};
}
