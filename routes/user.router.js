import { Router } from 'express';
import { getUsers } from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', (req, res) => {
	res.send({ title: 'GET a user details' });
});

userRouter.post('/', (req, res) => {
	res.send({ title: 'CREATE a new user' });
});

userRouter.put('/:id', (req, res) => {
	res.send({ title: 'UPDATE users detail' });
});
userRouter.delete('/:id', (req, res) => {
	res.send({ title: 'DELETE a user' });
});

export default userRouter;
