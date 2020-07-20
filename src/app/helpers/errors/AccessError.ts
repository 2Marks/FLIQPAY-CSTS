import { BaseError } from './BaseError';

export class AccessDeniedError extends BaseError {
  constructor(message: string, info?: any) {
    super(message || 'Access denied to requested resource', 403, 'ACCESS_DENIED', info);
  }
}

export class RequestedResourceDeniedError extends BaseError {
  constructor(message?: string, info?: any) {
    super(message || 'You do not have access to requested resource.', 403, 'ACCESS_DENIED', info);
  }
}

export class UpdateAccessDeniedError extends BaseError {
  constructor(message?: string, info?: any) {
    super(
      message || 'You do not have access to requested resource, therefore you cannot update it.',
      403,
      'ACCESS_DENIED',
      info,
    );
  }
}

export class DeleteAccessDeniedError extends BaseError {
  constructor(message?: string, info?: any) {
    super(
      message || 'You do not have access to requested resource, therefore you cannot delete it.',
      403,
      'ACCESS_DENIED',
      info,
    );
  }
}

export class AuthenticationError extends BaseError {
  constructor(message: string, code?: string, info?: any) {
    super(message || 'Unable to authenticate user', 403, code || 'USER_AUTHENTICATION_FALSE', info);
  }
}
