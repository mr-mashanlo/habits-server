import { model, Schema } from 'mongoose';
import z from 'zod';

export const User = z.object( {
  email: z.email( 'Invalid email address' ),
  password: z.string().min( 8, 'Must be at least 8 characters long' )
} );

export const UserSchema = new Schema( {
  email: { type: String, unique: true, require: true, trim: true, lowercase: true },
  password: { type: String, require: true, trim: true }
} );

export const UserModel = model( 'User', UserSchema );