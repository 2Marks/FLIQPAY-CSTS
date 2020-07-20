import { LoginUserDTO } from './authenticationInterface';
import { validate } from '../../helpers';
import { loginUserSchema } from './authenticationSchema';
import { AuthenticationService } from './authenticationService';

export class AuthenticationController {
  static async login(params: LoginUserDTO) {
    const value = validate(params, loginUserSchema);
    const data = await AuthenticationService.login(value);

    return {
      data,
      message: 'User loggedin successfully',
    };
  }
}
