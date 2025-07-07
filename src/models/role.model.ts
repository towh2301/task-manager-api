import mongoose from "mongoose";
import { createBaseSchema, IBaseModel } from "./base.model";

export interface IRole extends IBaseModel {
	roleName: string;
	description?: string;
	permissions: string[];
}

const roleDefinition = {
	roleName: {
		type: String,
		required: [true, "Role name is required"],
		unique: true,
		maxlength: [50, "Role name cannot exceed 50 characters"],
		trim: true,
	},
	description: {
		type: String,
		maxlength: [255, "Description cannot exceed 255 characters"],
		trim: true,
	},
	permissions: {
		type: [String],
		default: [],
		validate: {
			validator: function (permissions: string[]) {
				// Validate permission format
				const validPermissions = [
					"users.read",
					"users.write",
					"users.delete",
					"projects.read",
					"projects.write",
					"projects.delete",
					"tasks.read",
					"tasks.write",
					"tasks.delete",
					"admin.all",
				];
				return permissions.every((perm) =>
					validPermissions.includes(perm)
				);
			},
			message: "Invalid permission detected",
		},
	},
};

const roleSchema = createBaseSchema(roleDefinition);
roleSchema.index({ roleName: 1 });

export const Role = mongoose.model<IRole>("Role", roleSchema);
