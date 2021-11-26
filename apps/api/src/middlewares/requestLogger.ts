import morgan from 'morgan';
import pc from 'picocolors';

/**
 * Request Logging with morgan
 *
 * Logs all the requests received and some relevant information, this can be
 * helpful in development, but it is recommended to turn this off in production
 * to reduce the  request processing queue length. Using this in production may
 * affect the performance of your app and slow down your server.
 */

export default morgan((tokens, req, res) => {
	const { statusCode, methodName, requestURL, responseLength, responseTime, time, date } =
		extractAttributes(tokens, req, res);

	const coloredStatus = colorizeStatusCodes(statusCode);
	const coloredMethod = colorizeMethod(methodName);
	const coloredLengthInBytes = customizeLength(responseLength);
	const coloredResponseTime = customizeResponseTime(responseTime);

	return `[${date} ${time}] ${coloredStatus} | ${coloredMethod} ${requestURL} | ${coloredLengthInBytes}, ${coloredResponseTime}`;
});

function extractAttributes(tokens, req, res) {
	/**
	 * Extracts required attributes from the request
	 */
	const statusCode = tokens.status(req, res);
	const methodName = tokens.method(req, res);
	const requestURL = tokens.url(req, res);
	const responseLength = tokens.res(req, res, 'content-length');
	const responseTime = tokens['response-time'](req, res);
	const time = new Date(tokens.date(req, res)).toLocaleTimeString('en-US');
	const date = new Date(tokens.date(req, res)).toLocaleDateString('en-GB');

	return { statusCode, methodName, requestURL, responseLength, responseTime, time, date };
}

function colorizeStatusCodes(statusCode) {
	/**
	 * Adds chalk colors to the status codes:
	 * Code		|		Color
	 * 1xx		|		gray
	 * 2xx		|		green
	 * 3xx		|		cyan
	 * 4xx 		|		yellow
	 * 5xx		|		red
	 */

	let colorizedStatus;
	if (statusCode < 200) {
		colorizedStatus = pc.gray(statusCode);
	} else if (statusCode < 300) {
		colorizedStatus = pc.green(statusCode);
	} else if (statusCode < 400) {
		colorizedStatus = pc.cyan(statusCode);
	} else if (statusCode < 500) {
		colorizedStatus = pc.yellow(statusCode);
	} else {
		colorizedStatus = pc.red(statusCode);
	}
	return colorizedStatus;
}

function colorizeMethod(methodName) {
	/**
	 * Adds chalk colors to the Http request methods:
	 * Method			|		Color
	 * Get				|		blue
	 * Post, Put	|		magenta
	 * patch			|		yellow
	 * delete 		|		red
	 */
	let colorizedMethod;
	switch (methodName) {
		case 'GET':
			colorizedMethod = pc.blue(methodName);
			break;

		case 'POST':
		case 'PUT':
			colorizedMethod = pc.magenta(methodName);
			break;

		case 'PATCH':
			colorizedMethod = pc.yellow(methodName);
			break;

		case 'DELETE':
			colorizedMethod = pc.red(methodName);
			break;

		default:
			break;
	}
	return colorizedMethod;
}

function customizeLength(length) {
	/**
	 * Colorizes length string based on the value and adds 'B' as unit.
	 * size < 600 => default
	 * 600 <= size < 3000 => yellow
	 * size >= 3000 => red
	 */
	let customizedLength;
	if (length >= 600 && length < 3000) {
		customizedLength = pc.yellow(length + 'B');
	} else if (length >= 3000) {
		customizedLength = pc.red(length + 'B');
	} else if (!length) {
		customizedLength = '0B';
	} else {
		customizedLength = `${length}B`;
	}
	return customizedLength;
}

function customizeResponseTime(resTime) {
	/**
	 * Colorizes response time string based on the value and adds 'ms' as unit.
	 * size < 500 => default
	 * 500 <= size < 1000 => yellow
	 * size >= 1000 => red
	 */
	let coloredResponseTime;
	if (resTime >= 500 && resTime < 1000) {
		coloredResponseTime = pc.yellow(resTime + 'ms');
	} else if (resTime >= 1000) {
		coloredResponseTime = pc.red(resTime + 'ms');
	} else {
		coloredResponseTime = `${resTime}ms`;
	}
	return coloredResponseTime;
}
