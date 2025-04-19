import dayjs from 'dayjs';
import transporter, { accountEmail } from './../config/nodemailer.js';
import { emailTemplates } from './email-reminder-templates.js';

export const sendRemainderEmail = async ({ to, type, subscription }) => {
	if (!to || !type || !subscription)
		throw new Error('Missing required parameters');

	const emailTemplate = emailTemplates.find(
		(template) => template.label === type
	);
	if (!emailTemplate)
		throw new Error(`Email template for type "${type}" not found`);

	const mailInfo = {
		userName: subscription.user.name,
		subscriptionName: subscription.name,
		renewalDate: dayjs(subscription.renewalDate).format('MMM D, YYYY'),
		planName: subscription.name,
		price: `${subscription.currency} ${subscription.price} ${subscription.frequency}`,
		paymentMethod: subscription.paymentMethod,
	};

	const message = emailTemplate.generateBody(mailInfo);
	const subject = emailTemplate.generateSubject(mailInfo);

	const mailOptions = {
		from: accountEmail,
		to: to,
		subject: subject,
		html: message,
	};

	await transporter.sendMail(mailOptions, (err, info) => {
		if (err) return console.log(err, 'Error sending reminder E-mail');

		console.log(`Email sent to ${info.response}`);
	});
};
