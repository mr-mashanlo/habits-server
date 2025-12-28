import { Router } from 'express';

import { HabitController } from '../controllers/habit-controller.js';
import { ValidatorManager } from '../helpers/validator-manager.js';
import { authMiddleware } from '../middlewares/auth-middleware.js';
import { HabitDTO, HabitModel } from '../models/habit.js';
import { DatabaseService } from '../services/database-service.js';

const router = Router();
const validatorManager = new ValidatorManager( HabitDTO );
const databaseService = new DatabaseService( HabitModel );
const databaseController = new HabitController( databaseService, validatorManager );

router.post( '/', authMiddleware, databaseController.create );
router.get( '/', authMiddleware, databaseController.getMany );
router.post( '/many', authMiddleware, databaseController.upgradeMany );

export { router as habitRouter };