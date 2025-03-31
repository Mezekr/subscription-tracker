import { serve } from '@upstash/workflow/express';
import dayjs from 'dayjs';
import Subscription from '../models/subscription.model';

export const sendRemainder = serve(async (context) => {
	const { subscriptionId } = context.requestPayload;
	const subscription = await fetchSubscription(context, subscriptionId);

	if (!subscription || subscription.status === 'inactive') return;

	const renewalDate = dayjs(Subscription.renewalDate);

	if (renewalDate.isBefore(dayjs())) {
		console.log(
			`Renewal date has passed for the Subscription ${subscriptionId}. Stopping workflow`
		);
		return;
	}
});

const fetchSubscription = async (context, subscriptionId) => {
	return context.run('get Subscription', () => {
		return Subscription.findById(subscriptionId).populate(
			'user',
			'name email'
		);
	});
};
