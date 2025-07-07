import * as z from "zod/v4";

export const loginSchema = z.object({
	username: z
		.string()
		.min(5, { error: "Username must be at least 5 characters long" })
		.max(100, { error: "Username cannot exceed 100 characters" }),
	password: z
		.string()
		.min(6, { error: "Password must be at least 6 characters long" }),
});
