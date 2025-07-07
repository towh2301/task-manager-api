import { HttpStatus } from "@/enums/http-status.enum";
import { IUser, User } from "@/models/user.model";
import { UserService } from "@/services/user/user.services";
import { ApiResponse } from "@/types/api-response.type";
import { AppError } from "@/utils/app-error";
import { NextFunction, Request, Response } from "express";

export class UserController {
	private userService: UserService;

	constructor() {
		this.userService = new UserService();
		this.getAllUser = this.getAllUser.bind(this);
		this.getUserById = this.getUserById.bind(this);
		this.updateUserById = this.updateUserById.bind(this);
		this.createUser = this.createUser.bind(this);
	}

	getAllUser = async (req: Request, res: Response, next: NextFunction) => {
		try {
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

	createUser = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.body.id;

			let user: IUser | null = await User.findById(id);

			if (user !== null) {
				throw new AppError(
					HttpStatus.USER_EXISTED.message,
					HttpStatus.USER_EXISTED.code
				);
			}
			user = new User(req.body);
			user.save();

			const result: ApiResponse<IUser> = {
				code: HttpStatus.USER_CREATED_SUCCESSFULLY.code,
				success: true,
				data: user,
				message: HttpStatus.USER_CREATED_SUCCESSFULLY.message,
			};

			console.log("create user status: ", result);

			res.status(HttpStatus.OK.code).json(result);
		} catch (err: any) {
			next(err);
		}
	};
}
