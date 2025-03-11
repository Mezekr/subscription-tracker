import mongoose from 'mongoose';
import { DB_URL, NODE_ENV } from '../config/env.js';

if (!DB_URL) {
	throw new Error(
		'Please define a MongoDB Connection String in the .env.<development/production>.local file'
	);
}

const connectToDatabase = async () => {
	try {
		await mongoose.connect(DB_URL);
		console.log(`Connected to Database on ${NODE_ENV} mode.`);
	} catch (error) {
		console.error('Connection to Database Failed: ' + error);
		process.exit(1);
	}
};

export default connectToDatabase;
