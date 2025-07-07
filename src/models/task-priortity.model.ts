import mongoose from "mongoose";
import { IBaseModel, createBaseSchema } from "./base.model";

export interface ITaskPriority extends IBaseModel {
	name: string;
	color: string;
	sortOrder: number;
}

const taskPriorityDefinition = {
	name: {
		type: String,
		required: [true, "Priority name is required"],
		unique: true,
		maxlength: [50, "Priority name cannot exceed 50 characters"],
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
};

const taskPrioritySchema = createBaseSchema(taskPriorityDefinition);
taskPrioritySchema.index({ sortOrder: 1 });

export const TaskPriority = mongoose.model<ITaskPriority>(
	"TaskPriority",
	taskPrioritySchema
);
