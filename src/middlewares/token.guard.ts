import { IncomingHttpHeaders } from 'http';
import { RequestHandler, Request, Response, NextFunction } from 'express';

import { UserService } from '../service/user.service';

const userService = new UserService();

const getToken = (headers: IncomingHttpHeaders): string => {
  const authHeader = headers.authorization || '';

  return authHeader;
}

export const tokenGuard: (() => RequestHandler) = (() => (req: Request, res: Response, next: NextFunction) => {
  const token = getToken(req.headers);

  if (token === '') {
    return res.status(401).send({ result: { error: 'INVALID_TOKEN' } });
  }

  userService.verifyToken(token)
    .then((hasAccess) => {
      if (hasAccess) {
        next();
      } else {
        res.status(401).send({ result: { error: 'INVALID_TOKEN' } });
      }
    })
    .catch((error) => {
      res.status(401).send({ result: { error } });
    });
});
