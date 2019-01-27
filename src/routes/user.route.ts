import { Router, Response, Request } from 'express';

import { UserAddModel } from 'src/database/models/user';

import { UserService } from '../service/user.service';

const userRouter: Router = Router();
const userService = new UserService();

userRouter.post('/register', async (req: Request, res: Response) => {
  const payload: UserAddModel = req.body;

  const user = await userService.register(payload);

  res.status(201).send({ result: { user }});
});

export { userRouter };