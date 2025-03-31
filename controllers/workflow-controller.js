import { serve } from '@upstash/workflow/express';
import dayjs from 'dayjs';
import Subscription from '../models/subscription.model';

export const sendRemainder = serve(async (context) => {
	const { subscriptionId } = context.requestPayload;
	const subscription = await fetchSubscription(context, subscriptionId);

	const REMINDERS = [7, 3, 1];

	if (!subscription || subscription.status === 'inactive') return;

	const renewalDate = dayjs(Subscription.renewalDate);

	if (renewalDate.isBefore(dayjs())) {
		console.log(
			`Renewal date has passed for the Subscription ${subscriptionId}. Stopping workflow`
		);
		return;
	}

	for (const daysBefore of REMINDERS) {
		const renewalDate = renewalDate.subtract(daysBefore, 'day');

		if (renewalDate.isAfter())
			await sleepUntilRemainder(
				context,
				`Remainder ${daysBefore} days before`,
				renewalDate
			);
		await triggerRemainder(context, `Remainder ${daysBefore} days before`);
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

const sleepUntilRemainder = async (context, label, date) => {
	console.log(`Sleeping until ${label} reminder at ${date}`);
	return await context.sleepUntil('Sleep Remainder', date.toDate());
};

const triggerRemainder = async (context, label) => {
	return await context.run(`${label}`, async () => {
		console.log(`Trigger ${label} Reminder`);
		// Send E-mail , SMS or push notification
	});
};
