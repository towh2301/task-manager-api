import { IUser, User } from "@/models/user.model";
import { registerUserSchema } from "@/validator/auth/register.validator";
import * as z from "zod/v4";
import bcrypt from "bcrypt";
import { loginSchema } from "@/validator/auth/login.validator";
import { AppError } from "@/utils/app-error";
import { HttpStatus } from "@/enums/http-status.enum";
import {
	generateAccessToken,
	generateRefreshToken,
	verifyRefreshToken,
} from "@/utils/jwt-token.util";
import { Request } from "express";

type SafeUser = Omit<IUser, "password">;

export class AuthService {
	async register(
		userRegisterData: z.infer<typeof registerUserSchema>
	): Promise<SafeUser> {
		// Validate input
		const validatedUser = await registerUserSchema.parseAsync(
			userRegisterData
		);

		const { password } = userRegisterData;

		const hashed = await bcrypt.hash(password, 10);

		// Create and save user
		const newUser = new User({ ...validatedUser, password: hashed });
		await newUser.save();

		// Delete pass before return
		const userObj: any = newUser.toObject();
		delete userObj.password;

		return userObj;
	}

	async login(loginData: z.infer<typeof loginSchema>): Promise<any> {
		if (!loginData) {
			throw new AppError(
				HttpStatus.BAD_REQUEST.message,
				HttpStatus.BAD_REQUEST.code
			);
		}

		const validatedLoginData = loginSchema.parse(loginData);

		const { username, password } = validatedLoginData;

		const user = await User.findOne({ username }).select("+password");
		if (!user) {
			throw new AppError(
				HttpStatus.USER_NOT_FOUND.message,
				HttpStatus.USER_NOT_FOUND.code
			);
		}

		const match = await bcrypt.compare(password, user.password);
		if (!match) {
			throw new AppError(
				HttpStatus.WRONG_PASSWORD.message,
				HttpStatus.WRONG_PASSWORD.code
			);
		}

		const userPayload = {
			userId: user.id,
			username: user.username,
			roleName: user.role.roleName,
			rolePermission: user.role.permissions,
		};

		const accessToken = generateAccessToken(userPayload);
		const refreshToken = generateRefreshToken(userPayload);

		user.refreshToken = refreshToken;
		await user.save();

		return { accessToken, refreshToken };
	}

	async logout(token: string): Promise<any> {
		if (!token) {
			throw new AppError(
				`Token ${HttpStatus.NOT_FOUND.message}`,
				HttpStatus.NOT_FOUND.code
			);
		}

		const user = await User.findOne({ refreshToken: token });
		if (user) {
			user.refreshToken = undefined;
			await user.save();
		} else {
			throw new AppError(
				HttpStatus.USER_NOT_FOUND.message,
				HttpStatus.USER_NOT_FOUND.code
			);
		}
	}

	async refresh(token: string): Promise<any> {
		if (!token) {
			throw new AppError(
				`Token ${HttpStatus.NOT_FOUND.message}`,
				HttpStatus.NOT_FOUND.code
			);
		}

		const decoded = verifyRefreshToken(token) as any;
		const user = await User.findById(decoded.userId);

		if (!user) {
			throw new AppError(
				HttpStatus.USER_NOT_FOUND.message,
				HttpStatus.USER_NOT_FOUND.code
			);
		}

		if (user.refreshToken !== token) {
			throw new AppError(
				HttpStatus.INVALID_REFRESH_TOKEN.message,
				HttpStatus.INVALID_REFRESH_TOKEN.code
			);
		}

		const newAccessToken = generateAccessToken({ userId: user._id });

		return newAccessToken;
	}
}
