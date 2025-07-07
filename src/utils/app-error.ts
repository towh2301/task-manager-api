export class AppError extends Error {
	public readonly statusCode: number;
	public readonly isOperational: boolean;

	constructor(
		message: string,
		statusCode: number = 500,
		isOperational = true
	) {
		super(message);

		this.statusCode = statusCode;
		this.isOperational = isOperational;

		// Maintains proper stack trace for where error was thrown (only in V8 engines)
		Error.captureStackTrace(this, this.constructor);
	}
}
