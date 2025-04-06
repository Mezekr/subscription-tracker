import { Router } from 'express';
import { sendRemainder } from '../controllers/workflow-controller.js';

const workflowRouter = Router();

workflowRouter.post('/subscription/remainder', sendRemainder);

export default workflowRouter;
