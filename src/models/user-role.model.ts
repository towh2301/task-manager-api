import mongoose, { Schema } from "mongoose";
import { createBaseSchema, IBaseModel } from "./base.model";

export interface IUserRole extends IBaseModel {
	userId: string;
	roleId: string;
}

const userRoleDefinition = {
	userId: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: [true, "User ID is required"],
	},
	roleId: {
		type: Schema.Types.ObjectId,
		ref: "Role",
		required: [true, "Role ID is required"],
	},
};

const userRoleSchema = createBaseSchema(userRoleDefinition);

// Compound unique index
userRoleSchema.index({ userId: 1, roleId: 1 }, { unique: true });

export const UserRole = mongoose.model<IUserRole>("UserRole", userRoleSchema);
