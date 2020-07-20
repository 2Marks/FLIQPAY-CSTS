import { CreateUserDTO, GetAllUsersDTO, GetOneUserDTO } from './usersInterface';
import { validate, loggedInUser } from '../../helpers';
import { createUserSchema, getAllUsersSchema, getOneUserSchema } from './usersSchema';
import { UserService } from './usersService';

export class UserController {
  static async create(params: CreateUserDTO) {
    loggedInUser().authorizeRole('admin');

    const value = validate(params, createUserSchema);
    const data = await UserService.create(value);

    return {
      data,
      message: 'User saved successfully',
    };
  }

  static async getAll(params: GetAllUsersDTO) {
    loggedInUser().authorizeRole('admin');

    const value = validate(params, getAllUsersSchema);
    const data = await UserService.getAll(value);

    return {
      data,
      message: 'Users fetched successfully',
    };
  }

  static async getOne(params: GetOneUserDTO) {
    loggedInUser().authorizeRole('admin');

    const value = validate(params, getOneUserSchema);
    const data = await UserService.getOne(value);

    return {
      data,
      message: 'User fetched successfully',
    };
  }
}
