import fs from 'fs';
import path from 'path';
import { config } from './index';
import { FileSystemError } from './errors';

const isDevEnvironment = config.get('NODE_ENV') === 'development';
const PROJECT_DIRECTORY = isDevEnvironment ? '' : config.get('PROJECT_DIRECTORY');

interface SaveFileResponse {
  filePath: string;
  fileName: string;
}

export async function saveFile(fileName: string, data: any): Promise<SaveFileResponse> {
  return new Promise((resolve, reject) => {
    const fileNameArr = fileName.split('.').reverse();
    const newFileName = `${fileNameArr[1]}_${new Date().getTime()}.${fileNameArr[0]}`;
    const filePath = path.join(
      process.cwd(),
      `${PROJECT_DIRECTORY}`,
      'public',
      'downloads',
      newFileName,
    );

    fs.writeFile(filePath, data, (err) => {
      if (err) {
        reject(new FileSystemError(err));
      }
      resolve({ filePath, fileName: newFileName });
    });
  });
}
