import config from 'config';
import { Sequelize } from 'sequelize';

type DatabaseConfig = {
	database: string;
	host: string;
	username: string;
	password: string;
	provider: 'mysql' | 'postgres' | 'mariadb';
};

const dbConfig: DatabaseConfig = config.get('db');

export const db = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
	host: dbConfig.host,
	dialect: dbConfig.provider,
	logging: false
});
