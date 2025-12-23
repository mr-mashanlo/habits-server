import 'dotenv/config';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

import { errorMiddleware } from './middlewares/error-middleware.js';
import { authRouter } from './routers/auth-router.js';
import { habitRouter } from './routers/habit-router.js';

const app = express();
app.use( cors( { credentials: true, origin: [ process.env.FRONT_URL ] } ) );
app.use( cookieParser() );
app.use( express.json() );

app.use( '/auth', authRouter );
app.use( '/habit', habitRouter );

app.use( errorMiddleware );

mongoose.connect( process.env.MONGODB_URL );

app.listen( process.env.PORT, () => console.log( `Server is running on port ${process.env.PORT}` ) );

export default app;