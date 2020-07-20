import { BaseError } from './BaseError';

export class FileSystemError extends BaseError {
  constructor(error: any, message?: string) {
    super(
      message || 'Error occured during operation. Please try again later.',
      500,
      'FILE_SYSTEM_ERROR',
      error,
    );
  }
}
