import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', (req, res) => {
	res.send({ title: 'GET all users' });
});

userRouter.get('/:id', (req, res) => {
	res.send({ title: 'GET a users' });
});

userRouter.post('/', (req, res) => {
	res.send({ title: 'CREATE a users' });
});

userRouter.put('/:id', (req, res) => {
	res.send({ title: 'UPDATE users detail' });
});
userRouter.delete('/:id', (req, res) => {
	res.send({ title: 'DELETE    	 a users' });
});
