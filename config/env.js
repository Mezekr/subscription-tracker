import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const {
	PORT,
	NODE_ENV,
	DB_URL,
	JWT_SECRET_KEY,
	JWT_EXPIRES_IN,
	ARCJET_KEY,
	ARCJET_ENV,
	QSTASH_URL,
	QSTASH_TOKEN,
	SERVER_URL,
} = process.env;
