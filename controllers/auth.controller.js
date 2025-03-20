import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { JWT_EXPIRES_IN, JWT_SECRET_KEY } from '../config/env.js';
import User from '../models/user.model.js';

export const signUp = async (req, res, next) => {
	// 1. create a Mongoose Session for DB Atomicity
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		//2. Get the user data from the body
		const { name, email, password } = req.body;
		const isUserExist = await User.findOne({ email });

		// 2.1 Check if user has already exited
		if (isUserExist) {
			const error = new Error('User already exits');
			error.statusCode = 409;
			throw error;
		}
		// 2.2 if does not exist, then hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// 2.3 Create new users on the DB within the session
		const newUsers = await User.create(
			[{ name, email, password: hashedPassword }],
			{ session }
		);

		// 2.3 Sign users with JWT for authentication
		const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET_KEY, {
			expiresIn: JWT_EXPIRES_IN,
		});

		// 2.4 commit the new user document to the DB
		await session.commitTransaction();
		session.endSession();

		//3. send response
		res.status(201).json({
			success: true,
			message: ' User created successfully',
			data: {
				token,
				user: newUsers[0],
			},
		});
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		next(error);
	}
};
export const signIn = async (req, res, next) => {
	try {
		// 1. Get user login data
		const { email, password } = req.body;
		// 2. check if user already exits
		const user = await User.findOne({ email });
		if (!user) {
			const error = new Error('User not found');
			error.statusCode = 404;
			throw error;
		}
		// 3. compare password
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			const error = new Error('Invalid password');
			error.statusCode = 401;
			throw error;
		}
		// 4. Generate a token
		const token = await jwt.sign({ userId: user._id }, JWT_SECRET_KEY, {
			expiresIn: JWT_EXPIRES_IN,
		});
		// 5. Send response
		res.status(200).json({
			success: true,
			message: ' User signed successfully',
			data: {
				token,
				user,
			},
		});
	} catch (error) {
		console.error(error);
		next(error);
	}
};
export const signOut = (req, res, next) => {
	res.send({ title: 'Sign out' });
};
