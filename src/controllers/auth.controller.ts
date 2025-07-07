import { HttpStatus } from "@/enums/http-status.enum";
import { IUser } from "@/models/user.model";
import { AuthService } from "@/services/auth/auth.service";
import { ApiResponse } from "@/types/api-response.type";
import { loginSchema } from "@/validator/auth/login.validator";
import { registerUserSchema } from "@/validator/auth/register.validator";
import { NextFunction, Request, Response } from "express";
import z from "zod/v4";

export class AuthController {
	private authService: AuthService;

	constructor() {
		this.authService = new AuthService();
		this.registerUser = this.registerUser.bind(this);
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
		this.refresh = this.refresh.bind(this);
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

	login = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const data: z.infer<typeof loginSchema> = req.body;

			const { accessToken, refreshToken } = await this.authService.login(
				data
			);

			res.cookie("refreshToken", refreshToken, {
				httpOnly: true,
				secure: false,
				sameSite: "strict",
				maxAge: 7 * 24 * 60 * 60 * 1000,
			});

			const response: ApiResponse<any> = {
				code: HttpStatus.LOGIN_SUCCESSFULLY.code,
				success: true,
				data: { refreshToken: refreshToken, accessToken: accessToken },
				message: HttpStatus.LOGIN_SUCCESSFULLY.message,
			};

			res.status(HttpStatus.OK.code).json(response);
		} catch (err: any) {
			next(err);
		}
	};

	logout = async (req: Request, res: Response, next: NextFunction) => {
		try {
			this.authService.logout(req.cookies?.refreshToken);
			res.clearCookie("refreshToken");

			const response: ApiResponse<any> = {
				code: HttpStatus.OK.code,
				success: true,
				message: HttpStatus.OK.message,
			};

			res.status(HttpStatus.OK.code).json(response);
		} catch (err: any) {
			next(err);
		}
	};

	refresh = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const newAccessToken = this.authService.refresh(
				req.cookies?.refreshToken
			);

			const response: ApiResponse<any> = {
				code: HttpStatus.OK.code,
				success: true,
				data: { accessToken: newAccessToken },
				message: HttpStatus.OK.message,
			};

			res.status(HttpStatus.OK.code).json(response);
		} catch (err: any) {
			next(err);
		}
	};
}
