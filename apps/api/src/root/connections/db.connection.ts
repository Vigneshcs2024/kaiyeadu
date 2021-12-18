import { Sequelize } from 'sequelize';
import config from 'config';

type DatabaseConfig = {
	database: string;
	host: string;
	username: string;
	password: string;
	provider: 'mysql' | 'postgres' | 'mariadb';
};

const dbConfig: DatabaseConfig = config.get('db');

// ? this is a temporary fixup -
// !bug: config does not load envs
export const db = new Sequelize(
	dbConfig.database,
	dbConfig.username ?? process.env.DB_USER,
	dbConfig.password ?? process.env.DB_PASS,
	{
		host: dbConfig.host,
		dialect: dbConfig.provider,
		logging: false
	}
);
