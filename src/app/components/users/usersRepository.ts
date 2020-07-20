import bcrypt from 'bcryptjs';
import { User } from '../../database/models';
import { UserProps, GetAllUsersDTO } from './usersInterface';

const PASSWORD_SALT_ROUNDS = 10;

export class UserRepository {
  static async getByEmail(email: string): Promise<UserProps | null> {
    return (User.findOne({ email }) as unknown) as UserProps;
  }

  static async getByUsername(username: string): Promise<UserProps | null> {
    return (User.findOne({ username }) as unknown) as UserProps;
  }

  static async create(user: UserProps) {
    const hashedPassword = await bcrypt.hash(user.password, PASSWORD_SALT_ROUNDS);
    return User.create({ ...user, password: hashedPassword });
  }

  static async getAll(params: GetAllUsersDTO) {
    return User.find()
      .select(['name', 'email', 'username', 'roles', 'isActive'])
      .skip((params.page - 1) * params.perPage)
      .limit(params.perPage);
  }

  static async getOne(userId: number) {
    return User.findById(userId);
  }
}
