import User from '../models/user.model.js';

export const getUsers = async (req, res, next) => {
	try {
		const users = await User.find();
		if (!users) {
			const error = new Error('Users are not Found');
			error.statusCode = 404;
			throw error;
		}
		res.status(200).json({
			success: true,
			message: 'Users found successfully',
			data: {
				user: users,
			},
		});
	} catch (error) {
		console.error(error);
		next(error);
	}
};

export const getUser = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id).select('-password');
		if (!user) {
			const error = new Error('User not Found');
			error.statusCode = 404;
			throw error;
		}
		res.status(200).json({
			success: true,
			message: 'User found successfully',
			data: {
				user,
			},
		});
	} catch (error) {
		console.error(error);
		next(error);
	}
};
