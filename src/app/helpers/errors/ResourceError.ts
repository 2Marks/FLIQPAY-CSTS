import { BaseError } from './BaseError';

export class ResourceNotFoundError extends BaseError {
  constructor(message: string, info?: any) {
    super(message || 'Resource not found', 404, 'RESOURCE_NOT_FOUND', info);
  }
}

export class ResourceExistError extends BaseError {
  constructor(message: string, info?: any) {
    super(message || 'Resource already exists.', 409, 'RESOURCE_EXIST', info);
  }
}
