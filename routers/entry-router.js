import { Router } from 'express';

import { EntryController } from '../controllers/entry-controller.js';
import { ValidatorManager } from '../helpers/validator-manager.js';
import { authMiddleware } from '../middlewares/auth-middleware.js';
import { EntryDTO, EntryModel } from '../models/entry.js';
import { DatabaseService } from '../services/database-service.js';

const router = Router();
const validatorManager = new ValidatorManager( EntryDTO );
const entryService = new DatabaseService( EntryModel );
const databaseController = new EntryController( entryService, validatorManager );

router.get( '/', authMiddleware, databaseController.getMany );
router.post( '/many', authMiddleware, databaseController.upgradeMany );

export { router as entryRouter };