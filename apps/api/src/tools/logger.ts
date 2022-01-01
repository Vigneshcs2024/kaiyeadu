import config from 'config';
import chalk from 'chalk';
import { unlink } from 'fs/promises';
import winston from 'winston';
import { TransportStreamOptions } from 'winston-transport';

const { format, transports } = winston;
const { combine, colorize, printf, json, prettyPrint, timestamp } = format;

/**
 * A customized console transport
 */
const prettyConsoleTransport = new transports.Console({
	format: combine(
		colorize(),
		json(),
		timestamp({ format: 'DD/MM/YYYY h:mm:ss A' }),
		printf(info => {
			const { level, message, timestamp } = info;
			return `[${timestamp}] ${level} | ${message} ${
				level.includes('error')
					? chalk.greenBright('\n\t - Stack trace ends here - \n')
					: ''
			}`;
		})
	)
});

/**
 * Creates file transport
 */
const fileLogTransport = (filename: string, level: TransportStreamOptions['level']) => {
	return new transports.File({
		filename,
		level,
		format: combine(json(), timestamp(), prettyPrint())
	});
};

/**
 * Get winston configs and transports based on environment
 */
const getTransports = (generateFiles: boolean) => {
	const winstonConfigs = {
		transports: [prettyConsoleTransport, fileLogTransport('logs/debug.log', 'debug')],
		exceptionHandlers: [
			prettyConsoleTransport,
			fileLogTransport('logs/exceptions.log', 'error')
		],
		rejectionHandlers: [prettyConsoleTransport, fileLogTransport('logs/rejections.log', 'warn')]
	};

	if (generateFiles) return winstonConfigs;

	// pop out file transports, log only on console
	for (const configProp of Object.keys(winstonConfigs)) {
		winstonConfigs[configProp].pop();
	}
	return winstonConfigs;
};

/**
 * Deletes all log files
 */
const clearLogs = () => {
	const logFiles = ['logs/debug.log', 'logs/exceptions.log', 'logs/rejections.log'];
	for (const logFile of logFiles) {
		unlink(logFile).catch();
	}
};

const createInstance = () => {
	const transports = getTransports(config.get('logging.generateFiles'));
	const level: TransportStreamOptions['level'] = config.get('logging.level') ?? 'silly';

	clearLogs();

	return winston.createLogger({ level, ...transports });
};

export const logger = createInstance();
