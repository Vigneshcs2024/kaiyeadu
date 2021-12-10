export interface ApiResponse {
	message: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	result?: string | Record<string, any>;
}
