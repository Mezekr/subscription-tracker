import { Router } from 'express';
import {
	createSubscription,
	getUserSubscriptions,
} from '../controllers/subscription.controller.js';
import authorize from '../middlewares/auth.middleware.js';

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => {
	res.send({ title: 'GET all subscriptions' });
});

subscriptionRouter.get('/:id', (req, res) => {
	res.send({ title: 'GET subscription details' });
});

subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.put('/:id', (req, res) => {
	res.send({ title: 'UPDATE subscription details' });
});

subscriptionRouter.delete('/:id', (req, res) => {
	res.send({ title: 'DELETE a Subscriptions' });
});

subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);

subscriptionRouter.put('/:id/cancel', (req, res) => {
	res.send({ title: 'CANCEL a Subscriptions' });
});

subscriptionRouter.get('/upcoming-renewals', (req, res) => {
	res.send({ title: 'GET all upcoming subscriptions renewals' });
});

export default subscriptionRouter;
