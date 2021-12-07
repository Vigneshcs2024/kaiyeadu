export function jsonPrettyPrint(json: Record<string, unknown>): string {
	return JSON.stringify(json, null, 2);
}
