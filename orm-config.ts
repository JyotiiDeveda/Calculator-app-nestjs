import { config as dotenvConfig } from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });
export const typeOrmConfig: TypeOrmModuleOptions & DataSourceOptions = {
	type: 'postgres',
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	username: process.env.DB_USERNAME,
	password: String(process.env.DB_PASSWORD),
	database: process.env.DB_NAME,
	synchronize: false,
	logging: true,
};

export const AppDataSource = new DataSource(typeOrmConfig);
