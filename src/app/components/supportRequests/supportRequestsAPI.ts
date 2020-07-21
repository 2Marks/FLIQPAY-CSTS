import { APIRouter, APIHelper } from '../../helpers';
import { SupportRequestController } from './supportRequestsController';

const router = APIRouter();

router.post('/support-requests', (req, res) =>
  APIHelper({ req, res, controller: SupportRequestController.create }),
);

router.get('/support-requests', (req, res) =>
  APIHelper({ req, res, controller: SupportRequestController.getAll, expectPayload: false }),
);

router.get('/support-requests/:id', (req, res) =>
  APIHelper({ req, res, controller: SupportRequestController.getOne }),
);

router.post('/support-requests/:supportRequestId/comments', (req, res) =>
  APIHelper({ req, res, controller: SupportRequestController.comment }),
);

router.get('/support-requests/:supportRequestId/comments', (req, res) =>
  APIHelper({ req, res, controller: SupportRequestController.getSupportRequestComments }),
);

router.put('/support-requests/:supportRequestId/close', (req, res) =>
  APIHelper({ req, res, controller: SupportRequestController.closeSupportRequest }),
);

router.post('/support-requests/export', (req, res) =>
  APIHelper({ req, res, controller: SupportRequestController.exportClosedSupportRequest }),
);

export const supportRequestsAPI = router;
