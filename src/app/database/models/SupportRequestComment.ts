import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SupportRequestCommentSchema = new Schema(
  {
    supportRequestId: { type: String, required: true },
    comment: { type: String, required: true },
    commenterId: { type: String, required: true },
    commenterType: { type: String, required: true },
  },
  { timestamps: true },
);

export const SupportRequestComment = mongoose.model(
  'SupportRequestComment',
  SupportRequestCommentSchema,
);
