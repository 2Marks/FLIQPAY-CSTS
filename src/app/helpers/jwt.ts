import jwt from 'jsonwebtoken';
import { config } from '.';

export async function sign(payload = {}): Promise<string> {
  const token = jwt.sign(payload, config.get('APP_SECRET'), {
    expiresIn: new Date().getTime() + 2 * 24 * 3600 * 1000, // after 2 days
  });
  return token;
}

export async function verify(token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.get('APP_SECRET'), (err, decoded) => {
      if (err) {
        reject('failed to authenticate. Access token not valid');
      }
      return resolve(decoded);
    });
  });
}
