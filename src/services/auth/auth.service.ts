import { IUser, User } from "@/models/user.model";
import { registerUserSchema } from "@/validator/auth/register.validator";
import * as z from "zod/v4";
import bcrypt from "bcrypt";

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
}
