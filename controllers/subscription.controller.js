import { SERVER_URL } from '../config/env.js';
import { workflowClient } from '../config/upstash.js';
import Subscription from '../models/subscription.model.js';

export const createSubscription = async (req, res, next) => {
	try {
		const subscription = await Subscription.create({
			...req.body,
			user: req.user._id,
		});

		// initiate the Subscription remainder
		const { workflowRunId } = await workflowClient.trigger({
			url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
			body: {
				subscriptionId: subscription.id,
			},
			headers: {
				'Content-type': 'application/json',
			},
			retries: 0,
		});
		console.log('Send Remainder from create Subscription');

		await res.status(201).json({
			success: true,
			message: 'Subscription successfully created',
			data: {
				subscription,
				workflowRunId,
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
