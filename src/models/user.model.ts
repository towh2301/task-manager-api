import mongoose, { Schema } from "mongoose";
import { baseSchemaOptions, createBaseSchema, IBaseModel } from "./base.model";

export interface IUser extends IBaseModel {
	name: string;
	email: string;
	password: string;
	dob?: Date;
	avatarUrl?: string;
	isActive: boolean;
	emailVerified: boolean;
	lastLoginAt?: Date;
}

const userDefinition = {
	name: {
		type: String,
		required: [true, "Name is required"],
		maxlength: [100, "Name cannot exceed 100 characters"],
		trim: true,
	},
	email: {
		type: String,
		require: [true, "Email is required"],
		unique: true,
		maxlength: [150, "Email cannot exceed 150 characters"],
		lowercase: true,
		trim: true,
		match: [
			/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
			"Please enter a valid email",
		],
	},
	password: {
		type: String,
		required: [true, "Password is required"],
		minlength: [6, "Password must be at least 6 characters"],
		select: false, // Không return password trong queries
	},
	dob: {
		type: Date,
		validateFutureAge: {
			validator: function (value: Date) {
				return value <= new Date();
			},
			message: "Date of birth cannot be in the future",
		},
		validateValidAge: {
			validator: function (value: Date) {
				const today = new Date();
				const birthDate = new Date(value);
				let age = today.getFullYear() - birthDate.getFullYear();
				const monthDiff = today.getMonth() - birthDate.getMonth();

				if (
					monthDiff < 0 ||
					(monthDiff === 0 && today.getDate < birthDate.getDate)
				) {
					age--;
				}

				return age >= 16;
			},
			message: "User must be older than 16",
		},
	},
	avatarUrl: {
		type: String,
		match: [/^https?:\/\//, "Avatar URL must be a valid URL"],
	},
	isActive: {
		type: Boolean,
		default: true,
		index: true,
	},
	emailVerified: {
		type: Boolean,
		default: false,
	},
	lastLoginAt: {
		type: Date,
	},
} as const;

const userSchema = createBaseSchema(userDefinition);

// Indexes
userSchema.index({ isActive: 1, email: 1 });

// Instance methods
userSchema.methods.toSafeObject = function () {
	const obj = this.toObject();
	delete obj.password;
	return obj;
};

export const User = mongoose.model<IUser>("User", userSchema);
