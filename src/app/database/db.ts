import mongoose from 'mongoose';
import { config } from '../helpers';

class Database {
  constructor() {
    this.init();
  }

  private init() {
    mongoose
      .connect(config.get('DATABASE_URL'), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log('Database connection successful'))
      .catch((err) => console.log(err));
  }
}

export const db = new Database();
