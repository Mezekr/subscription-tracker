import express from 'express';
import { PORT } from './config/env.js';
import connectToDatabase from './database/dbConfig.js';
import authRouter from './routes/auth.router.js';
import subscriptionRouter from './routes/subscription.router.js';
import userRouter from './routes/user.router.js';

const app = express();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

app.get('/', (req, res) => {
	res.send('Welcome to the Subscription API!');
});

app.listen(PORT, () => {
	console.log(
		`Subscription tracker API is running on http://localhost:${PORT}`
	);
	connectToDatabase();
});

export default app;
