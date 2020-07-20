import { Request, Response, NextFunction } from 'express';
import * as config from '../../config';
import { ResourceNotFoundError } from '../helpers';

// prettier-ignore
export async function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (config.get('DEBUG')) {
    console.log(err);
  }

  return res.status(err.status || 500).json({
    status: false,
    message: err.message,
    code: err.code,
    errors: err.info,
  });
}

export async function endpointNotFoundHandler(req: Request, res: Response, next: NextFunction) {
  next(new ResourceNotFoundError(`API Endpoint (${req.path} -> ${req.method}) not found`));
}
