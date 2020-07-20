export class BaseError extends Error {
  private status: number;
  private info: any;
  private code: string;

  constructor(message: string, status: number, code: string, info?: any) {
    super(message);

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);

    this.status = status || 500;
    this.info = info;
    this.code = code;
  }
}
