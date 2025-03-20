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
