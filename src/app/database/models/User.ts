import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    username: String,
    email: { type: String, required: true, unique: true, lowercase: true },
    isActive: { type: Boolean, required: true },
    password: { type: String, required: true },
    roles: [{ type: String, required: true }],
  },
  { timestamps: true },
);

export const User = mongoose.model('User', userSchema);
