import { serve } from '@upstash/workflow/express';
import Subscription from './../models/subscription.model';

export const sendRemainder = serve(async (context) => {
	const { subscriptionId } = context.requestPayload;
	const subscription = await fetchSubscription(context, subscriptionId);

	if (!subscription || subscription.status === 'inactive') return;
});

const fetchSubscription = async (context, subscriptionId) => {
	return context.run('get Subscription', () => {
		return Subscription.findById(subscriptionId).populate(
			'user',
			'name email'
		);
	});
};
