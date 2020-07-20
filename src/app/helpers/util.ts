import path from 'path';
import { config } from '.';

export function getBaseDir(): string {
  const isDevEnvironment = process.env.NODE_ENV === 'development';
  const PROJECT_DIRECTORY = isDevEnvironment ? '' : config.get('PROJECT_DIRECTORY');

  return path.join(process.cwd(), `${PROJECT_DIRECTORY}`);
}

export function isLengthy<T>(data: any[]): boolean {
  return data && data.length > 0;
}

export function isNotLengthy<T>(data: any[] | undefined): boolean {
  return !data || data.length <= 0;
}

export function isTruthy<T>(data: T): boolean {
  return data && data !== undefined;
}

export function isFalsy<T>(data: any): boolean {
  return !data || data === undefined || data === null;
}
