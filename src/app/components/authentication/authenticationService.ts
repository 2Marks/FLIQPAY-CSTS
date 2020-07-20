import { LoginUserDTO } from './authenticationInterface';
import { UserService } from '../users';
import { jwt } from '../../helpers';

export class AuthenticationService {
  static async login(params: LoginUserDTO) {
    const user = await UserService.authenticateUser(params.username, params.password);
    const payload = { userId: user._id, name: user.name, email: user.email, roles: user.roles };
    const token = await jwt.sign(payload);

    return { ...payload, token };
  }
}
