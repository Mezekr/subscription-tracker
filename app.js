import cookieParser from 'cookie-parser';
import express from 'express';
import { PORT } from './config/env.js';
import connectToDatabase from './database/dbConfig.js';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';
import errorMiddleware from './middlewares/error.middleware.js';
import authRouter from './routes/auth.router.js';
import subscriptionRouter from './routes/subscription.router.js';
import userRouter from './routes/user.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// arcjet for attack protection, rate limiting, bot protection
app.use(arcjetMiddleware);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

app.use(errorMiddleware);
app.get('/', (req, res) => {
	res.send('Welcome to the Subscription API!');
});

app.listen(PORT, async () => {
	console.log(
		`Subscription tracker API is running on http://localhost:${PORT}`
	);
	await connectToDatabase();
});

export default app;
