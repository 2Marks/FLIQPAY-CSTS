import {
  SupportRequestProps,
  GetAllSupportRequestsDTO,
  SupportRequestCommentProps,
  CommenterType,
  SupportRequestStatus,
  GenerateReportsDTO,
} from './supportRequestsInterface';
import { SupportRequest, SupportRequestComment } from '../../database/models';

export class SupportRequestRepository {
  static async create(supportRequest: SupportRequestProps) {
    return SupportRequest.create(supportRequest);
  }

  static async getAll(params: GetAllSupportRequestsDTO) {
    return SupportRequest.find()
      .skip((params.page - 1) * params.perPage)
      .limit(params.perPage);
  }

  static async getOne(id: string) {
    return (SupportRequest.findById(id) as unknown) as SupportRequestProps;
  }

  static async addComment(comment: SupportRequestCommentProps) {
    return SupportRequestComment.create(comment);
  }

  static async getSupportRequestComments(supportRequestId: string) {
    return SupportRequestComment.find({ supportRequestId });
  }

  static async getAgentCommentsOnSupportRequest(supportRequestId: string) {
    return SupportRequestComment.find({ supportRequestId, commenterType: CommenterType.agent });
  }

  static async updateSupportRequestStatus(supportRequestId: string, status: SupportRequestStatus) {
    return SupportRequest.updateOne(
      { _id: supportRequestId },
      { status, ...(status === SupportRequestStatus.closed && { closedAt: new Date() }) },
    );
  }

  static async getClosedSupportRequest(startDate: Date | string, endDate: Date | string) {
    return SupportRequest.find({
      closedAt: { $gte: startDate, $lte: endDate },
    })
      .where({ status: SupportRequestStatus.closed })
      .sort({ closedAt: 1 });
  }

  static async generateReport(params: GenerateReportsDTO) {
    return SupportRequest.find({
      createdAt: { $gte: params.startDate, $lte: params.endDate },
    })
      .where({ status: params.status })
      .sort({ createdAt: 1 });
  }
}
