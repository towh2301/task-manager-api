import { User } from "@/models/user.model";
import { error } from "console";
import * as z from "zod/v4";

// Helper: check if date string is valid and user >= 16
const dobSchema = z
	.string()
	.refine((val) => !isNaN(Date.parse(val)), {
		message: "Invalid date format",
	})
	.refine(
		(val) => {
			const dob = new Date(val);
			const today = new Date();
			let age = today.getFullYear() - dob.getFullYear();
			const m = today.getMonth() - dob.getMonth();
			const d = today.getDate() - dob.getDate();

			if (age < 16) return false;
			if (age === 16 && (m < 0 || (m === 0 && d < 0))) return false;

			return true;
		},
		{
			message: "User must be at least 16 years old",
		}
	);

const usernameSchema = z
	.string()
	.min(5, { error: "Username must be at least 5 characters long" })
	.max(100, { error: "Username cannot exceed 100 characters" })
	.refine(
		async (username) => {
			const user = await User.findOne({ username });
			return !user;
		},
		{
			error: "Username is existing",
		}
	);

const emailSchema = z
	.email({ error: "Invalid email format" })
	.max(150, { error: "Email cannot exceed 150 characters" })
	.refine(
		async (email) => {
			const user = await User.findOne({ email });
			return !user;
		},
		{
			error: "Email is existing",
		}
	);

export const registerUserSchema = z.object({
	username: usernameSchema,
	email: emailSchema,
	password: z
		.string()
		.min(6, { error: "Password must be at least 6 characters long" }),
	firstName: z.string().nonempty({ error: "First name must be filled" }),
	lastName: z.string().nonempty({ error: "Last name must be filled" }),
	dob: dobSchema.optional().nullable(), // required if you want to enforce age, optional if flexible
	avatarUrl: z
		.url({ error: "Avatar URL must be a valid URL" })
		.optional()
		.nullable(),
});
