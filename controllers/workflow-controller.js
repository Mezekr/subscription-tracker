import dayjs from 'dayjs';
import { createRequire } from 'module';
import Subscription from '../models/subscription.model.js';
import { sendRemainderEmail } from '../utils/send-reminder-email.js';
const require = createRequire(import.meta.url);
const { serve } = require('@upstash/workflow/express');

const REMINDERS = [7, 5, 3, 1];

export const sendRemainder = serve(async (context) => {
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
		const reminderDate = renewalDate.subtract(daysBefore, 'day');

		if (reminderDate.isAfter())
			await sleepUntilRemainder(
				context,
				`${daysBefore} days before reminder`,
				renewalDate
			);
		if (dayjs().isSame(reminderDate, 'day')) {
			await triggerRemainder(
				context,
				`${daysBefore} days before reminder`,
				subscription
			);
		}
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

const triggerRemainder = async (context, label, subscription) => {
	return await context.run(label, async () => {
		console.log(`Trigger ${label} Reminder`);
		await sendRemainderEmail({
			to: subscription.user.email,
			type: label,
			subscription,
		});
	});
};
