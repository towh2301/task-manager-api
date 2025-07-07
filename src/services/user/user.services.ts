import { HttpStatus } from "@/enums/http-status.enum";
import { IUser, User } from "@/models/user.model";
import { AppError } from "@/utils/app-error";
import { Request, Response } from "express";

export class UserService {
	async getAllUsers(): Promise<IUser[]> {
		return await User.find();
	}

	async getUserById(userId: string): Promise<IUser> {
		const user = await User.findById(userId);
		if (!user) {
			throw new AppError(
				HttpStatus.USER_NOT_FOUND.message,
				HttpStatus.USER_NOT_FOUND.code
			);
		}
		return user;
	}

	async updateUserById(
		userId: string,
		updateData: Partial<IUser>
	): Promise<IUser> {
		const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
			new: true,
		});

		if (!updatedUser) {
			throw new AppError(
				HttpStatus.USER_NOT_FOUND.message,
				HttpStatus.USER_NOT_FOUND.code
			);
		}

		return updatedUser;
	}
}
