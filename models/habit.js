import { model, Schema } from 'mongoose';
import z from 'zod';

export const HabitDTO = z.object( {
  _id: z.string().optional(),
  title: z.string(),
  archived: z.boolean().optional()
} );

export const Habit = z.object( {
  _id: z.string(),
  user: z.string(),
  title: z.string(),
  archived: z.boolean(),
  createdAt: z.string(),
  startDate: z.string(),
  endDate: z.string()
} );

export const HabitSchema = new Schema( {
  user: { type: Schema.Types.ObjectId, ref: 'User', index: true },
  title: { type: String, require: true, trim: true },
  archived: { type: Boolean, default: false },
  createdAt: { type: String },
  startDate: { type: String },
  endDate: { type: String }
} );

export const HabitModel = model( 'Habit', HabitSchema );