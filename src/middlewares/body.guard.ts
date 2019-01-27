import { RequestHandler, Response, Request, NextFunction } from 'express';

import { UserAddModel, UserLoginModel } from '../database/models/user';

export const bodyGuard: ((type: string) => RequestHandler) = ((type) => (req: Request, res: Response, next: NextFunction) => {
  let body: UserAddModel | UserLoginModel | any;
  let isValid: boolean;

  switch (type) {
    case 'user-register':
      body = req.body as UserAddModel;
      isValid = !!body.email && !!body.password && !!body.username;

      if (!isValid) {
        return res.status(400).send({ result: { error: 'MISSING_INFORMATION' } });
      }

      break;
    case 'user-login':
      body = req.body as UserLoginModel;
      isValid = !!body.username && !!body.password;

      if (!isValid) {
        return res.status(400).send({ result: { error: 'MISSING_INFORMATION' } });
      }
    default: 
      break;
  };

  next();
});
