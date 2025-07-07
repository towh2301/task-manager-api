import { HttpStatus } from "@/enums/http-status.enum";
import { IUser } from "@/models/user.model";
import { UserService } from "@/services/user/user.services";
import { ApiResponse } from "@/types/api-response.type";
import { AppError } from "@/utils/app-error";
import { NextFunction, Request, Response } from "express";

export class UserController {
	userService: UserService;

	constructor() {
		this.userService = new UserService();
		this.getAllUser = this.getAllUser.bind(this);
		this.getUserById = this.getUserById.bind(this);
	}

	getAllUser = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const users: IUser[] = await this.userService.getAllUsers();

			const response: ApiResponse<IUser[]> = {
				success: true,
				message: "Get all users successfully!",
				data: users,
			};

			res.status(HttpStatus.OK.code).json(response);
		} catch (err: any) {
			next(err);
		}
	};

	getUserById = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;

			if (!id || typeof id !== "string") {
				throw new AppError(
					HttpStatus.INVALID_USER_ID.message,
					HttpStatus.INVALID_USER_ID.code
				);
			}

			const user = await this.userService.getUserById(id);

			const response: ApiResponse<IUser> = {
				success: true,
				data: user,
			};

			res.status(HttpStatus.OK.code).json(response);
		} catch (err: any) {
			next(err);
		}
	};
}
