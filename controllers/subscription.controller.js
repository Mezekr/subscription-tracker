import Subscription from '../models/subscription.model.js';

export const createSubscription = async (req, res, next) => {
	try {
		const subscription = await Subscription.create({
			...req.body,
			user: req.user._id,
		});
		res.status(201).json({
			successes: true,
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
