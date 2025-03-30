import Subscription from '../models/subscription.model.js';

export const createSubscription = async (req, res, next) => {
	try {
		const subscription = await Subscription.create({
			...req.body,
			user: req.user._id,
		});
		res.status(201).json({
			success: true,
			message: 'Subscription successfully created',
			data: {
				subscription,
			},
		});
	} catch (error) {
		console.error('Failed to create a subscription');
		next(error);
	}
};

export const getUserSubscriptions = async (req, res, next) => {
	try {
		//check the User with user on the token
		if (req.user.id !== req.params.id) {
			const err = new Error('You are not the owner of this account');
			err.status = 401;
			throw err;
		}
		const subscriptions = await Subscription.find({ user: req.params.id });

		res.status(200).json({
			success: true,
			message: 'Subscriptions successfully retrieved',
			data: subscriptions,
		});
	} catch (error) {
		console.error(error.message);
		next(error);
	}
};
