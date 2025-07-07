import mongoose from "mongoose";
import { IBaseModel, createBaseSchema } from "./base.model";

export interface ITaskStatus extends IBaseModel {
	name: string;
	color: string;
	sortOrder: number;
	isFinal: boolean;
}

const taskStatusDefinition = {
	name: {
		type: String,
		required: [true, "Status name is required"],
		unique: true,
		maxlength: [50, "Status name cannot exceed 50 characters"],
		trim: true,
	},
	color: {
		type: String,
		default: "#6B7280",
		match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color format"],
	},
	sortOrder: {
		type: Number,
		default: 0,
		index: true,
	},
	isFinal: {
		type: Boolean,
		default: false,
		index: true,
	},
};

const taskStatusSchema = createBaseSchema(taskStatusDefinition);
taskStatusSchema.index({ sortOrder: 1 });

export const TaskStatus = mongoose.model<ITaskStatus>(
	"TaskStatus",
	taskStatusSchema
);
