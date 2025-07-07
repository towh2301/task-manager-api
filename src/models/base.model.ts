import { timeStamp } from "console";
import { Document, Schema, SchemaDefinition } from "mongoose";

// Base interface for all models
export interface IBaseModel extends Document {
	createdAt: Date;
	updatedAt: Date;
	createdBy?: string;
	updatedBy?: string;
	isDeleted: boolean;
	deletedAt?: Date;
	deletedBy?: string;
}

// Base schema options
export const baseSchemaOptions = {
	timeStamp: true, // auto generate createdAt, updatedAt,...
	versionKey: false, // turn off __v field
	toJSON: {
		transform: function (doc: any, ret: any) {
			ret.id = ret._id;
			delete ret._id;
			delete ret.__v;

			// Ẩn các field deleted nếu không cần thiết
			if (ret.isDeleted === false) {
				delete ret.isDeleted;
				delete ret.deletedAt;
				delete ret.deletedBy;
			}
			return ret;
		},
	},
};

export const baseSchemaDefinition: SchemaDefinition = {
	createdBy: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: false,
	},
	updatedBy: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: false,
	},
	isDeleted: {
		type: Boolean,
		default: false,
		index: true, // Index for performance
	},
	deletedAt: {
		type: Date,
		required: false,
	},
	deletedBy: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: false,
	},
};

// Utility function to create schema with base fields
export function createBaseSchema(definition: any, options: any = {}) {
	const mergedDefinition = {
		...baseSchemaDefinition,
		...definition,
	};

	const mergedOptions = {
		...baseSchemaOptions,
		...options,
	};

	const schema = new Schema(mergedDefinition, mergedOptions);

	// Middleware để tự động set createdBy/updatedBy
	schema.pre("save", function (next) {
		if (this.isNew && this.get("_user")) {
			this.set("createdBy", this.get("_user"));
		}
		if (this.get("_user")) {
			this.set("updatedBy", this.get("_user"));
		}
		next();
	});

	// Middleware để tự động filter deleted records
	schema.pre(/^find/, function (next) {
		// Chỉ lấy records chưa bị xóa, trừ khi explicitly request
		if (!this.getOptions().includeDeleted) {
			this.where({ isDeleted: { $ne: true } });
		}
		next();
	});

	// Method để soft delete
	schema.methods.softDelete = function (userId?: string) {
		this.isDeleted = true;
		this.deletedAt = new Date();
		if (userId) {
			this.deletedBy = userId;
		}
		return this.save();
	};

	// Method để restore
	schema.methods.restore = function () {
		this.isDeleted = false;
		this.deletedAt = undefined;
		this.deletedBy = undefined;
		return this.save();
	};

	return schema;
}

// Utility type cho request context
export interface IRequestContext {
	userId?: string;
	user?: any;
}

// Middleware để inject user context
export function withUserContext(doc: any, context: IRequestContext) {
	if (context.userId) {
		doc._user = context.userId;
	}
	return doc;
}
