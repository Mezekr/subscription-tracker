import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Subscription name is required'],
			trim: true,
			minLength: 2,
			maxLength: 1000,
		},
		price: {
			type: Number,
			required: [true, 'Subscription Price is required'],
			min: [0, 'Price must be greater than 0'],
		},
		currency: {
			type: String,
			enum: ['USD', 'EUR', 'GBP', 'NKF'],
			default: 'USD',
		},
		frequency: {
			type: String,
			enum: ['daily', 'weekly', 'monthly', 'yearly'],
			default: 'monthly',
		},
		category: {
			type: String,
			enum: [
				'life style',
				'sports',
				'entertainment',
				'politics',
				'technology',
				'finance',
				'other',
			],
			required: [true, 'Category is required'],
		},
		paymentMethod: {
			type: String,
			required: true,
			trim: true,
		},
		status: {
			type: String,
			enum: ['active', 'cancelled', 'expired'],
			default: 'active',
		},

		startDate: {
			type: Date,
			required: true,
			validate: {
				validator: (value) => value <= new Date(),
				message: 'Start date must be in the past',
			},
		},
		renewalDate: {
			type: Date,
			validate: {
				validator: function (value) {
					return value > this.startDate;
				},
				message: 'Renewal date must be after start date',
			},
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
			index: true,
		},
	},
	{ timestamps: true }
);

const Subscription = mongoose.model('Subscription', subscriptionSchema);

subscriptionSchema.pre('save', function (next) {
	//calculate renewal date  based on renewal frequency
	if (!this.renewalDate) {
		const renewalPeriods = {
			daily: 1,
			weekly: 7,
			monthly: 30,
			yearly: 365,
		};

		this.renewalDate = new Date(this.startDate);
		this.renewalDate.setDate(
			this.renewalDate.getDate() + renewalPeriods[this.frequency]
		);
	}

	// Auto update the subscription status
	if (this.renewalDate < new Date()) {
		this.status = 'expired';
	}

	//continue with creation of the document
	next();
});

export default Subscription;
