import { Router, Response, Request } from 'express';

import { bodyGuard } from '../middlewares/body.guard';

import { UserAddModel, UserLoginModel } from 'src/database/models/user';

import { UserService } from '../service/user.service';

const userRouter: Router = Router();
const userService = new UserService();

userRouter.post('/register', bodyGuard('user-register'), async (req: Request, res: Response) => {
  const payload: UserAddModel = req.body;

  const user = await userService.register(payload);

  res.status(201).send({ result: { user }});
});

userRouter.post('/login', bodyGuard('user-login'), async (req: Request, res: Response) => {
  const payload: UserLoginModel = req.body;

  const token = await userService.login(payload);

  res.status(200).send({ result : { token } });
});

export { userRouter };
