import { RequestHandler, Response, Request, NextFunction } from 'express';

import { UserAddModel } from '../database/models/user';

export const bodyGuard: ((type: string) => RequestHandler) = ((type) => (req: Request, res: Response, next: NextFunction) => {
  switch (type) {
    case 'user':
      const body: UserAddModel = req.body;
      const isValid: boolean = body.email && body.password && body.username && true;

      if (!isValid) {
        return res.status(400).send({ result: { error: 'MISSING_INFORMATION' }})
      }

      break;
    default: 
      next();
  };
});
