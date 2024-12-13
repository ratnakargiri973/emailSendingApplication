import express from 'express';
import { sendingEmail } from './emailController.js';

const emailRouter = express.Router();

emailRouter.post('/user', sendingEmail);

export default emailRouter;