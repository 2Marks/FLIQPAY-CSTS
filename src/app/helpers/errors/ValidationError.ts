import { BaseError } from './BaseError';

export class UnprocessableEntityError extends BaseError {
  constructor(message: string, info?: any, code?: string) {
    super(
      message || 'Unprocessable Entity. Error during payload Validation.',
      422,
      code || 'UNPROCESSABLE_ENTITY',
      info,
    );
  }
}

export class JoiValidationError extends BaseError {
  constructor(message: string, error: any) {
    if (error instanceof BaseError) {
      throw error;
    }

    const errors = error.details.map((err: any) => {
      return {
        message: resolveMessage(err.message, err.path),
        path: err.path,
        type: err.type,
      };
    });
    const extraMsg = 'Kindly revalidate your inputs';

    super(
      `${message} ${extraMsg}` || `Error during request payload validation. ${extraMsg}`,
      422,
      'VALIDATION_ERROR',
      errors,
    );
  }
}

function resolveMessage(message: string, path: string[]) {
  if (path.length > 1) {
    return `${message} (${path.join('->')})`;
  }
  return message;
}
