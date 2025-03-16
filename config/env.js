import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const { PORT, NODE_ENV, DB_URL, JWT_SECRET_KEY, JWT_EXPIRES_IN } =
	process.env;
