import {
  CreateSupportRequestDTO,
  SupportRequestStatus,
  GetAllSupportRequestsDTO,
  GetOneSupportRequestDTO,
  AddCommentDTO,
  CommenterType,
  GetSupportRequestCommentsDTO,
  CloseSupportRequestDTO,
  ExportClosedSupportRequestsDTO,
} from './supportRequestsInterface';
import {
  loggedInUser,
  ResourceNotFoundError,
  AccessDeniedError,
  isLengthy,
  UnprocessableEntityError,
  isNotLengthy,
  exportToCSV,
} from '../../helpers';
import { SupportRequestRepository } from './supportRequestsRepository';
import { exportSupportRequestsFields } from './supportRequestsConstant';

export class SupportRequestService {
  static async create(params: CreateSupportRequestDTO) {
    return SupportRequestRepository.create({
      ...params,
      status: SupportRequestStatus.pending,
      creatorId: loggedInUser().getId(),
    });
  }

  static async getAll(params: GetAllSupportRequestsDTO) {
    return SupportRequestRepository.getAll(params);
  }

  static async getOne(params: GetOneSupportRequestDTO) {
    return SupportRequestRepository.getOne(params.id);
  }

  static async comment(params: AddCommentDTO) {
    const supportRequest = await SupportRequestRepository.getOne(params.supportRequestId);

    if (supportRequest === null) {
      throw new ResourceNotFoundError('Support request not found');
    }

    if (supportRequest.status === SupportRequestStatus.closed) {
      throw new AccessDeniedError(
        'You cannot make comments. Support request has already been marked as closed.',
      );
    }

    const agentCommentsOnSupportRequest = await SupportRequestRepository.getAgentCommentsOnSupportRequest(
      <string>supportRequest._id,
    );
    const hasAgentMadeComment = isLengthy(agentCommentsOnSupportRequest);

    if (!hasAgentMadeComment && loggedInUser().isCustomer()) {
      throw new AccessDeniedError(
        'Access Denied. You can only make comment on your support request, after an agent has responded',
      );
    }

    if (!hasAgentMadeComment && loggedInUser().isAgent()) {
      await SupportRequestRepository.updateSupportRequestStatus(
        <string>supportRequest._id,
        SupportRequestStatus.processing,
      );
    }

    return SupportRequestRepository.addComment({
      supportRequestId: <string>supportRequest._id,
      comment: params.comment,
      commenterId: loggedInUser().getId(),
      commenterType: loggedInUser().isCustomer() ? CommenterType.customer : CommenterType.agent,
    });
  }

  static async getSupportRequestComments(params: GetSupportRequestCommentsDTO) {
    const supportRequest = await SupportRequestRepository.getOne(params.supportRequestId);

    if (supportRequest === null) {
      throw new ResourceNotFoundError('Support request not found');
    }

    return SupportRequestRepository.getSupportRequestComments(params.supportRequestId);
  }

  static async closeSupportRequest(params: CloseSupportRequestDTO) {
    const supportRequest = await SupportRequestRepository.getOne(params.supportRequestId);

    if (supportRequest === null) {
      throw new ResourceNotFoundError('Support request not found');
    }

    if (supportRequest.status === SupportRequestStatus.closed) {
      throw new UnprocessableEntityError('Support request has already been marked as closed.');
    }

    return SupportRequestRepository.updateSupportRequestStatus(
      <string>supportRequest._id,
      SupportRequestStatus.closed,
    );
  }

  static async exportClosedSupportRequest(params: ExportClosedSupportRequestsDTO) {
    const supportRequests = await SupportRequestRepository.getClosedSupportRequest(
      params.startDate,
      params.endDate,
    );

    if (isNotLengthy(supportRequests)) {
      throw new ResourceNotFoundError('No data available to export');
    }

    const { fileName } = await exportToCSV({
      data: supportRequests,
      fields: exportSupportRequestsFields,
      name: 'support_requests_exports',
    });

    return fileName;
  }
}
