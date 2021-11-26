import morgan from 'morgan';
import pc from 'picocolors';

/**
 * Request Logging with morgan
 *
 * Logs all the requests received and some relevant information, this can be
 * helpful in development, but it is recommended to turn this off in production
 * to reduce the  request processing queue length. Using this in production may
 * affect the performance of your app and slow down your server.
 *
 * @param {*} worker
 */
export default function requestLogger() {
	return morgan((tokens, req, res) => {
		const { statusCode, methodName, requestURL, responseLength, responseTime, time, date } =
			extractAttributes(tokens, req, res);

		const coloredStatus = colorizeStatusCodes(statusCode);
		const coloredMethod = colorizeMethod(methodName);
		const coloredLengthInBytes = customizeLength(responseLength);
		const coloredResponseTime = customizeResponseTime(responseTime);

		return `[${date} ${time}] ${coloredStatus} | ${coloredMethod} ${requestURL} # ${coloredLengthInBytes}, ${coloredResponseTime}`;
	});
}

/**
 * Extracts required attributes from the request
 */
function extractAttributes(tokens, req, res) {
	const statusCode = tokens.status(req, res);
	const methodName = tokens.method(req, res);
	const requestURL = tokens.url(req, res);
	const responseLength = tokens.res(req, res, 'content-length');
	const responseTime = tokens['response-time'](req, res);
	const time = new Date(tokens.date(req, res)).toLocaleTimeString('en-US');
	const date = new Date(tokens.date(req, res)).toLocaleDateString('en-GB');
	console.log('ik');

	return {
		statusCode,
		methodName,
		requestURL,
		responseLength,
		responseTime,
		time,
		date
	};
}

/**
 * Colorize status codes based on the value
 */
function colorizeStatusCodes(statusCode: number | string): string {
	/*
	 * Adds pc colors to the status codes:
	 * Code		|		Color
	 * 1xx		|		gray
	 * 2xx		|		green
	 * 3xx		|		cyan
	 * 4xx 		|		yellow
	 * 5xx		|		red
	 */

	if (statusCode < 200) return pc.gray(statusCode);

	if (statusCode < 300) return pc.green(statusCode);

	if (statusCode < 400) return pc.cyan(statusCode);

	if (statusCode < 500) return pc.yellow(statusCode);

	if (statusCode >= 500) return pc.red(statusCode);
}

/**
 * Colorize method name based on the value
 */
function colorizeMethod(methodName: string): string {
	/*
	 * Adds pc colors to the Http request methods:
	 * Method			|		Color
	 * Get				|		blue
	 * Post, Put	|		magenta
	 * patch			|		yellow
	 * delete 		|		red
	 */
	switch (methodName) {
		case 'GET':
			return pc.blue(methodName);

		case 'POST':
		case 'PUT':
			return pc.magenta(methodName);

		case 'PATCH':
			return pc.yellow(methodName);

		case 'DELETE':
			return pc.red(methodName);

		default:
			return methodName;
	}
}

/**
 * Customize res length based on the length(size)
 */
function customizeLength(length: number | string): string {
	/*
	 * Colorizes length string based on the value and adds 'B' as unit.
	 * size < 600 => default
	 * 600 <= size < 3000 => yellow
	 * size >= 3000 => red
	 */
	if (length >= 600 && length < 3000) {
		return pc.yellow(`${length}B`);
	}
	if (length >= 3000) {
		return pc.red(`${length}B`);
	}

	return !length ? '0B' : `${length}B`;
}

/**
 * Customize res time based
 * @param {number} resTime
 * @returns {string} colorized time string with unit
 */
function customizeResponseTime(resTime: number | string): string {
	/*
	 * Colorizes response time string based on the value and adds 'ms' as unit.
	 * size < 500 => default
	 * 500 <= size < 1000 => yellow
	 * size >= 1000 => red
	 */
	if (resTime >= 500 && resTime < 1000) return pc.yellow(`${resTime}ms`);

	return resTime >= 1000 ? pc.red(`${resTime}ms`) : `${resTime}ms`;
}
