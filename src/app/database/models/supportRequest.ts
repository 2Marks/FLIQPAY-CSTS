import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const supportRequestSchema = new Schema(
  {
    subject: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true, default: 'pending' },
    creatorId: { type: String, required: true },
    closedAt: Date,
  },
  { timestamps: true },
);

export const SupportRequest = mongoose.model('SupportRequest', supportRequestSchema);
