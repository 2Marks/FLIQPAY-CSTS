import { APIHelper, APIRouter } from '../../helpers';
import { UserController } from './usersController';

const router = APIRouter();

router.post('/users', (req, res) => APIHelper({ req, res, controller: UserController.create }));

router.get('/users', (req, res) =>
  APIHelper({ req, res, controller: UserController.getAll, expectPayload: false }),
);

router.get('/users/:id', (req, res) => APIHelper({ req, res, controller: UserController.getOne }));

router.post('/users/:id/:action', (req, res) =>
  APIHelper({ req, res, controller: UserController.toggleUserStatus }),
);

export const usersAPI = router;
