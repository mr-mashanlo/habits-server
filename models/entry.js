import { model, Schema } from 'mongoose';
import z from 'zod';

export const EntryDTO = z.object( {
  _id: z.string().optional(),
  habit: z.string(),
  date: z.string(),
  done: z.boolean(),
  archived: z.boolean().optional()
} );

export const Entry = z.object( {
  _id: z.string(),
  user: z.string(),
  habit: z.string(),
  date: z.string(),
  done: z.boolean(),
  archived: z.boolean()
} );

export const EntrySchema = new Schema( {
  user: { type: Schema.Types.ObjectId, ref: 'User', index: true },
  habit: { type: Schema.Types.ObjectId, ref: 'Habit' },
  date: { type: String, require: true, index: true },
  done: { type: Boolean, default: false },
  archived: { type: Boolean, default: false }
} );

export const EntryModel = model( 'Entry', EntrySchema );