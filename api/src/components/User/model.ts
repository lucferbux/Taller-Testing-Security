import * as bcrypt from 'bcrypt';
import * as connections from '@/config/connection/connection';
import { Document, Schema } from 'mongoose';
import { NextFunction } from 'express';

/**
 * @export
 * @interface IUserRequest
 */
export interface IUserRequest {
  _id: string;
  email: string;
}

/**
 * @export
 * @interface IUserModel
 * @extends {Document}
 */
export interface IUserModel extends Document {
  email: string;
  password: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;

  tokens?: AuthToken[];

  comparePassword?: (password: string) => Promise<boolean>;
}

export type AuthToken = {
  accessToken: string;
  kind: string;
};

const UserSchema = new Schema<IUserModel>(
  {
    email: {
      type: String,
      unique: true,
      trim: true
    },
    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
    tokens: Array
  },
  {
    collection: 'users',
    versionKey: false
  }
).pre('save', async function (next: NextFunction): Promise<void> {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt: string = await bcrypt.genSalt(10);

    const hash: string = await bcrypt.hash(this.password, salt);

    this.password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});

/**
 * Method for comparing passwords
 */
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  try {
    const match: boolean = await bcrypt.compare(candidatePassword, this.password);

    return match;
  } catch (error) {
    return error;
  }
};

export default connections.db.model<IUserModel>('UserModel', UserSchema);
