import bcrypt from 'bcryptjs';
import {
  CreateUserDTO,
  GetAllUsersDTO,
  GetOneUserDTO,
  ToggleUserStatusDTO,
  UserStatusActions,
} from './usersInterface';
import { UserRepository } from './usersRepository';
import {
  isTruthy,
  ResourceExistError,
  isFalsy,
  ResourceNotFoundError,
  UnprocessableEntityError,
  AccessDeniedError,
} from '../../helpers';

export class UserService {
  static async create(user: CreateUserDTO) {
    //check to ensure a customer cannot have another role asides the customer role
    if (user.roles.includes('customer') && user.roles.length > 1) {
      throw new UnprocessableEntityError(
        'A user with customer role is not allowed to have other roles',
      );
    }

    const userWithEmail = await UserRepository.getByEmail(user.email);

    if (isTruthy(userWithEmail)) {
      throw new ResourceExistError(`User with email ${user.email} already exists.`);
    }

    const userWithUsername = await UserRepository.getByUsername(user.username);

    if (isTruthy(userWithUsername)) {
      throw new ResourceExistError(`Username ${user.username} has been taken. Kindly try another.`);
    }

    return UserRepository.create({ ...user, isActive: true });
  }

  static async getAll(params: GetAllUsersDTO) {
    return UserRepository.getAll(params);
  }

  static async getOne(params: GetOneUserDTO) {
    return UserRepository.getOne(params.id);
  }

  static async authenticateUser(username: string, password: string) {
    const user = await UserRepository.getByUsername(username);

    if (user === null || isFalsy(user)) {
      throw new ResourceNotFoundError(`User not found`);
    }

    const doesPasswordMatch = await bcrypt.compare(password, user.password);

    if (!doesPasswordMatch) {
      throw new UnprocessableEntityError('Login credentials incorrect.');
    }

    if (!user.isActive) {
      throw new AccessDeniedError('User not active.');
    }

    return user;
  }

  static async toggleUserStatus(params: ToggleUserStatusDTO) {
    const user = await UserRepository.getById(params.id);

    if (user === null) {
      throw new ResourceNotFoundError(`User not found`);
    }

    return params.action === UserStatusActions.activate
      ? UserRepository.activate(params.id)
      : UserRepository.deactivate(params.id);
  }
}
