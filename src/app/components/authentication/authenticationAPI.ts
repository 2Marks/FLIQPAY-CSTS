import { APIRouter, APIHelper } from '../../helpers';
import { AuthenticationController } from './authenticationController';

const router = APIRouter();

router.post('/login', (req, res) =>
  APIHelper({ req, res, controller: AuthenticationController.login }),
);

export const authenticationAPI = router;
