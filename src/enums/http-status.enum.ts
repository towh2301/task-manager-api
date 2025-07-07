type HttpStatusKey =
	| "OK"
	| "CREATED"
	| "ACCEPTED"
	| "NO_CONTENT"
	| "MOVED_PERMANENTLY"
	| "FOUND"
	| "NOT_MODIFIED"
	| "BAD_REQUEST"
	| "UNAUTHORIZED"
	| "PAYMENT_REQUIRED"
	| "FORBIDDEN"
	| "NOT_FOUND"
	| "METHOD_NOT_ALLOWED"
	| "NOT_ACCEPTABLE"
	| "CONFLICT"
	| "GONE"
	| "UNSUPPORTED_MEDIA_TYPE"
	| "UNPROCESSABLE_ENTITY"
	| "TOO_MANY_REQUESTS"
	| "INTERNAL_SERVER_ERROR"
	| "NOT_IMPLEMENTED"
	| "BAD_GATEWAY"
	| "SERVICE_UNAVAILABLE"
	| "GATEWAY_TIMEOUT"
	| "INVALID_USER_ID"
	| "USER_NOT_FOUND"
	| "USER_UPDATED_SUCCESSFULLY"
	| "USER_EXISTED"
	| "USER_CREATED_SUCCESSFULLY"
	| "GET_ALL_USER_SUCCESSFULLY"
	| "GET_USER_BY_ID_SUCCESSFULLY"
	| "WRONG_PASSWORD"
	| "LOGIN_SUCCESSFULLY"
	| "INVALID_REFRESH_TOKEN"
	| "INVALID_ACCESS_TOKEN";

type HttpStatusEntry = {
	code: number;
	message: string;
};

export const HttpStatus: Record<HttpStatusKey, HttpStatusEntry> = {
	OK: { code: 200, message: "OK" },
	CREATED: { code: 201, message: "Created" },
	ACCEPTED: { code: 202, message: "Accepted" },
	NO_CONTENT: { code: 204, message: "No Content" },

	MOVED_PERMANENTLY: { code: 301, message: "Moved Permanently" },
	FOUND: { code: 302, message: "Found" },
	NOT_MODIFIED: { code: 304, message: "Not Modified" },

	BAD_REQUEST: { code: 400, message: "Bad Request" },
	UNAUTHORIZED: { code: 401, message: "Unauthorized" },
	PAYMENT_REQUIRED: { code: 402, message: "Payment Required" },
	FORBIDDEN: { code: 403, message: "Forbidden" },
	NOT_FOUND: { code: 404, message: "Not Found" },
	METHOD_NOT_ALLOWED: { code: 405, message: "Method Not Allowed" },
	NOT_ACCEPTABLE: { code: 406, message: "Not Acceptable" },
	CONFLICT: { code: 409, message: "Conflict" },
	GONE: { code: 410, message: "Gone" },
	UNSUPPORTED_MEDIA_TYPE: { code: 415, message: "Unsupported Media Type" },
	UNPROCESSABLE_ENTITY: { code: 422, message: "Unprocessable Entity" },
	TOO_MANY_REQUESTS: { code: 429, message: "Too Many Requests" },

	INTERNAL_SERVER_ERROR: { code: 500, message: "Internal Server Error" },
	NOT_IMPLEMENTED: { code: 501, message: "Not Implemented" },
	BAD_GATEWAY: { code: 502, message: "Bad Gateway" },
	SERVICE_UNAVAILABLE: { code: 503, message: "Service Unavailable" },
	GATEWAY_TIMEOUT: { code: 504, message: "Gateway Timeout" },

	INVALID_USER_ID: { code: 1001, message: "Invalid User ID" },
	USER_NOT_FOUND: { code: 1002, message: "User not found" },
	USER_UPDATED_SUCCESSFULLY: {
		code: 1003,
		message: "User updated successfully",
	},
	USER_EXISTED: { code: 1003, message: "User existed" },
	USER_CREATED_SUCCESSFULLY: {
		code: 1006,
		message: "Created user successfully",
	},
	GET_ALL_USER_SUCCESSFULLY: {
		code: 1007,
		message: "Get all users successfully",
	},
	GET_USER_BY_ID_SUCCESSFULLY: {
		code: 1008,
		message: "Get user by ID successfully",
	},
	WRONG_PASSWORD: {
		code: 1009,
		message: "Wrong password",
	},
	LOGIN_SUCCESSFULLY: {
		code: 1010,
		message: "Login successfully",
	},
	INVALID_REFRESH_TOKEN: {
		code: 1011,
		message: "Invalid refresh token",
	},
	INVALID_ACCESS_TOKEN: {
		code: 1012,
		message: "Invalid access token",
	},
};
