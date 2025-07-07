export class AppError extends Error {
	public readonly errorCode: number;
	public readonly statusCode: number = 500;
	public readonly isOperational: boolean;

	constructor(message: string, errorCode: number, isOperational = true) {
		super(message);

		this.errorCode = errorCode;
		this.isOperational = isOperational;

		// Maintains proper stack trace for where error was thrown (only in V8 engines)
		Error.captureStackTrace(this, this.constructor);
	}
}
