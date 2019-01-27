import { Router } from 'express';

import { userRouter } from './user.route';

const router: Router = Router();

router.use('/user', userRouter);

export { router };