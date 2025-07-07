import mongoose, { Schema } from "mongoose";
import { createBaseSchema, IBaseModel } from "./base.model";

export interface IProject extends IBaseModel {
	name: string;
	description?: string;
	color: string;
	isArchived: boolean;
	ownerId: string;
}

const projectDefinition = {
	name: {
		type: String,
		required: [true, "Project name is required"],
		maxlength: [100, "Project name cannot exceed 100 characters"],
		trim: true,
	},
	description: {
		type: String,
		maxlength: [1000, "Description cannot exceed 1000 characters"],
		trim: true,
	},
	color: {
		type: String,
		default: "#3B82F6",
		match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color format"],
	},
	isArchived: {
		type: Boolean,
		default: false,
		index: true,
	},
	ownerId: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: [true, "Owner ID is required"],
	},
};

const projectSchema = createBaseSchema(projectDefinition);

// Indexes
projectSchema.index({ ownerId: 1 });
projectSchema.index({ ownerId: 1, isArchived: 1 });

export const Project = mongoose.model<IProject>("Project", projectSchema);
