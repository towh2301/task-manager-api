import { error } from "console";
import * as z from "zod/v4";

export const updateUserData = z.object({
	username: z
		.string()
		.min(5, { error: "name must be more than 5 characters" })
		.optional()
		.nullable(),
	email: z.email({ error: "Wrong email format" }).optional().nullable(),
	dob: z
		.string()
		.refine((val) => !isNaN(Date.parse(val)), { error: "Invalid date" })
		.transform((val) => new Date(val))
		.refine(
			(dob) => {
				const today = new Date();
				const age = today.getFullYear() - dob.getFullYear();
				const m = today.getMonth() - dob.getMonth();
				const d = today.getDate() - dob.getDate();

				// if age < 16
				if (age < 16) return false;

				if (age === 16) {
					if (m < 0) return false;
					if (m === 0 && d < 0) return false;
				}

				return true;
			},
			{ error: "User must be at least 16 years old" }
		)
		.optional()
		.nullable(),
	avatarUrl: z.string().optional().nullable(),
});
