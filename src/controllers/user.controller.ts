import { adminPermissions } from "@/constant/permission.constant";
import { HttpStatus } from "@/enums/http-status.enum";
import { IUser } from "@/models/user.model";
import { UserService } from "@/services/user/user.services";
import { ApiResponse } from "@/types/api-response.type";
import { AppError } from "@/utils/app-error";
import { NextFunction, Request, Response } from "express";
import { hasPermission } from "./helpers";

export class UserController {
	private userService: UserService;

	constructor() {
		this.userService = new UserService();
		this.getAllUser = this.getAllUser.bind(this);
		this.getUserById = this.getUserById.bind(this);
		this.updateUserById = this.updateUserById.bind(this);
	}

	getAllUser = async (req: Request, res: Response, next: NextFunction) => {
		try {
			if (!hasPermission((req as any).user, adminPermissions)) {
				throw new AppError(
					"You are not admin",
					HttpStatus.FORBIDDEN.code
				);
			}

			const users: IUser[] = await this.userService.getAllUsers();

			const response: ApiResponse<IUser[]> = {
				code: HttpStatus.GET_ALL_USER_SUCCESSFULLY.code,
				success: true,
				message: HttpStatus.GET_ALL_USER_SUCCESSFULLY.message,
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
				code: HttpStatus.GET_USER_BY_ID_SUCCESSFULLY.code,
				success: true,
				message: HttpStatus.GET_USER_BY_ID_SUCCESSFULLY.message,
				data: user,
			};

			res.status(HttpStatus.OK.code).json(response);
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
			const { id } = req.params;

			if (!id || typeof id !== "string") {
				throw new AppError(
					HttpStatus.INVALID_USER_ID.message,
					HttpStatus.INVALID_USER_ID.code
				);
			}

			const updateData = req.body;

			const updatedUser = await this.userService.updateUserById(
				id,
				updateData
			);

			const response: ApiResponse<IUser> = {
				code: HttpStatus.USER_UPDATED_SUCCESSFULLY.code,
				success: true,
				data: updatedUser,
				message: HttpStatus.USER_UPDATED_SUCCESSFULLY.message,
			};

			res.status(HttpStatus.OK.code).json(response);
		} catch (err: any) {
			next(err);
		}
	};
}
