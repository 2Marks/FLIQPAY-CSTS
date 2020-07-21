export interface CreateSupportRequestDTO {
  subject: string;
  description: string;
}

export enum SupportRequestStatus {
  pending = 'pending',
  processing = 'processing',
  closed = 'closed',
}

export enum CommenterType {
  customer = 'customer',
  agent = 'agent',
}

export interface SupportRequestProps {
  readonly _id?: string;
  subject: string;
  description: string;
  status: SupportRequestStatus;
  creatorId: string;
}
export interface SupportRequestCommentProps {
  readonly _id?: string;
  readonly supportRequestId: string;
  comment: string;
  commenterId: string;
  commenterType: CommenterType;
}

export interface GetAllSupportRequestsDTO {
  page: number;
  perPage: number;
  searchQuery?: string;
}

export interface GetOneSupportRequestDTO {
  id: string;
}

export interface AddCommentDTO {
  supportRequestId: string;
  comment: string;
}

export interface GetSupportRequestCommentsDTO {
  supportRequestId: string;
}

export interface CloseSupportRequestDTO {
  supportRequestId: string;
}

export interface GenerateReportsDTO {
  startDate: Date | string;
  endDate: Date | string;
  status: SupportRequestStatus;
}

export interface ExportClosedSupportRequestsDTO {
  startDate: Date | string;
  endDate: Date | string;
  format?: ReportFormat;
}
export enum ReportFormat {
  csv = 'csv',
  pdf = 'pdf',
}
