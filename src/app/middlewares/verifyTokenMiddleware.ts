import { Request, Response, NextFunction } from 'express';
import httpContext from 'express-http-context';
import { jwt, AccessDeniedError, AuthenticationError } from '../helpers';

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.body.token || req.query.token || req.headers['access-token'];

  if (token) {
    jwt
      .verify(token)
      .then((user) => {
        res.locals.loggedInUser = user;
        httpContext.set('loggedInUser', { ...user });
        next();
      })
      .catch((error) => {
        next(new AccessDeniedError('Invalid access token provided.', error));
      });
  } else {
    next(new AuthenticationError('No Access Token Provided', 'ACCESS_TOKEN_FALSE'));
  }
}
