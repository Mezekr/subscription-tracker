import dayjs from 'dayjs';
import { createRequire } from 'module';
import Subscription from '../models/subscription.model.js';
const require = createRequire(import.meta.url);
const { serve } = require('@upstash/workflow/express');

const REMINDERS = [7, 3, 1];

export const sendRemainder = serve(async (context) => {
	console.log('Send Remainder');

	const { subscriptionId } = context.requestPayload;
	const subscription = await fetchSubscription(context, subscriptionId);

	if (!subscription || subscription.status !== 'active') return;

	const renewalDate = dayjs(subscription.renewalDate);

	if (renewalDate.isBefore(dayjs())) {
		console.log(
			`Renewal date has passed for the Subscription ${subscriptionId}. Stopping workflow.`
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
	return context.run('get subscription', async () => {
		return Subscription.findById(subscriptionId).populate(
			'user',
			'name email'
		);
	});
};

const sleepUntilRemainder = async (context, label, date) => {
	console.log(`Sleeping until ${label} reminder at ${date}`);
	return await context.sleepUntil(label, date.toDate());
};

const triggerRemainder = async (context, label) => {
	return await context.run(label, async () => {
		console.log(`Trigger ${label} Reminder`);
		// Send E-mail , SMS or push notification
	});
};
