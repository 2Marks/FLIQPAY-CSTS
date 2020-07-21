import {
  CreateSupportRequestDTO,
  GetAllSupportRequestsDTO,
  GetOneSupportRequestDTO,
  AddCommentDTO,
  GetSupportRequestCommentsDTO,
  CloseSupportRequestDTO,
  ExportClosedSupportRequestsDTO,
} from './supportRequestsInterface';
import { loggedInUser, validate } from '../../helpers';
import {
  createSupportRequestSchema,
  getAllSupportRequestsSchema,
  getOneSupportRequestSchema,
  addCommentSchema,
  getSupportRequestCommentSchema,
  closeSupportRequestSchema,
  exportClosedSupportRequestsSchema,
} from './supportRequestsSchema';
import { SupportRequestService } from './supportRequestsService';

export class SupportRequestController {
  static async create(params: CreateSupportRequestDTO) {
    loggedInUser().authorizeRole('customer');

    const value = validate(params, createSupportRequestSchema);
    const data = await SupportRequestService.create(value);

    return {
      data,
      message: 'support request created successfully',
    };
  }

  static async getAll(params: GetAllSupportRequestsDTO) {
    loggedInUser().authorizeRole('admin');

    const value = validate(params, getAllSupportRequestsSchema);
    const data = await SupportRequestService.getAll(value);

    return {
      data,
      message: 'support requests fetched successfully',
    };
  }

  static async getOne(params: GetOneSupportRequestDTO) {
    loggedInUser().authorizeRole('admin');

    const value = validate(params, getOneSupportRequestSchema);
    const data = await SupportRequestService.getOne(value);

    return {
      data,
      message: 'support request fetched successfully',
    };
  }

  static async comment(params: AddCommentDTO) {
    loggedInUser().hasAnyRole(['customer', 'agent']);

    const value = validate(params, addCommentSchema);
    const data = await SupportRequestService.comment(value);

    return {
      data,
      message: 'comment added to support request successfully',
    };
  }

  static async getSupportRequestComments(params: GetSupportRequestCommentsDTO) {
    loggedInUser().hasAnyRole(['customer', 'agent']);

    const value = validate(params, getSupportRequestCommentSchema);
    const data = await SupportRequestService.getSupportRequestComments(value);

    return {
      data,
      message: 'support request comments fetched successfully',
    };
  }

  static async closeSupportRequest(params: CloseSupportRequestDTO) {
    loggedInUser().hasAnyRole(['customer']);

    const value = validate(params, closeSupportRequestSchema);
    const data = await SupportRequestService.closeSupportRequest(value);

    return {
      data,
      message: 'support request marked as closed successfully',
    };
  }

  static async exportClosedSupportRequest(params: ExportClosedSupportRequestsDTO) {
    loggedInUser().authorizeRole('agent');

    const value = validate(params, exportClosedSupportRequestsSchema);
    const data = await SupportRequestService.exportClosedSupportRequest(value);

    return {
      data,
      message: 'support requests exported successfully',
    };
  }
}
