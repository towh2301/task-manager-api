import mongoose, { Schema } from "mongoose";
import { IBaseModel, createBaseSchema } from "./base.model";

export interface ITask extends IBaseModel {
	title: string;
	description?: string;
	dueDate?: Date;
	completed: boolean;
	completedAt?: Date;
	estimatedHours?: number;
	actualHours?: number;
	userId: string; // assignee
	projectId: string;
	statusId: string;
	priorityId: string;
	parentTaskId?: string;
}

const taskDefinition = {
	title: {
		type: String,
		required: [true, "Task title is required"],
		maxlength: [200, "Task title cannot exceed 200 characters"],
		trim: true,
	},
	description: {
		type: String,
		maxlength: [2000, "Description cannot exceed 2000 characters"],
		trim: true,
	},
	dueDate: {
		type: Date,
		validate: {
			validator: function (value: Date) {
				return !value || value >= new Date();
			},
			message: "Due date cannot be in the past",
		},
	},
	completed: {
		type: Boolean,
		default: false,
		index: true,
	},
	completedAt: {
		type: Date,
	},
	estimatedHours: {
		type: Number,
		min: [0, "Estimated hours cannot be negative"],
		max: [1000, "Estimated hours cannot exceed 1000"],
	},
	actualHours: {
		type: Number,
		min: [0, "Actual hours cannot be negative"],
		max: [1000, "Actual hours cannot exceed 1000"],
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: [true, "Assignee is required"],
	},
	projectId: {
		type: Schema.Types.ObjectId,
		ref: "Project",
		required: [true, "Project is required"],
	},
	statusId: {
		type: Schema.Types.ObjectId,
		ref: "TaskStatus",
		required: [true, "Status is required"],
	},
	priorityId: {
		type: Schema.Types.ObjectId,
		ref: "TaskPriority",
		required: [true, "Priority is required"],
	},
	parentTaskId: {
		type: Schema.Types.ObjectId,
		ref: "Task",
	},
};

const taskSchema = createBaseSchema(taskDefinition);

// Indexes
taskSchema.index({ userId: 1 });
taskSchema.index({ projectId: 1 });
taskSchema.index({ statusId: 1 });
taskSchema.index({ priorityId: 1 });
taskSchema.index({ parentTaskId: 1 });
taskSchema.index({ dueDate: 1 });
taskSchema.index({ projectId: 1, statusId: 1 });
taskSchema.index({ userId: 1, completed: 1 });

// Pre-save middleware
taskSchema.pre("save", function (next) {
	if (this.completed && !this.completedAt) {
		this.completedAt = new Date();
	} else if (!this.completed && this.completedAt) {
		this.completedAt = undefined;
	}
	next();
});

export const Task = mongoose.model<ITask>("Task", taskSchema);
