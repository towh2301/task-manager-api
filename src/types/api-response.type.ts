export interface ApiResponse<T> {
	success: boolean;
	message?: string;
	data?: T;
	error?: any;
	[key: string]: string | number | boolean | T | undefined; // Allow additional fields for flexibility
}
