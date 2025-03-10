import express from 'express';
import { PORT } from './config/env.js';
import authRouter from './routes/auth.router.js';

const app = express();

app.use('/api/v1/auth', authRouter);

app.get('/', (req, res) => {
	res.send('Welcome to the Subscription API!');
});

app.listen(PORT, () =>
	console.log(
		`Subscription tracker API is running on http://localhost:${PORT}`
	)
);

export default app;
