export function generateOTP(length = 6, alphanum = true): string {
	let result = '';
	const characters = alphanum ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' : '0123456789';
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
}
