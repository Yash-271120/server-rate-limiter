import mongoose, { Document } from 'mongoose';

export interface User extends Document {
  username: string;
  password: string;
  email: string;
}

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  email: { type: String, unique: true },
});

export default mongoose.model<User>('User', userSchema);
