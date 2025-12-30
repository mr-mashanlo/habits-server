import { Router } from 'express';

import { AuthController } from '../controllers/auth-controller.js';
import { AuthManager } from '../helpers/auth-manager.js';
import { BcryptManager } from '../helpers/bcrypt-manager.js';
import { DocumentManager } from '../helpers/document-manager.js';
import { ValidatorManager } from '../helpers/validator-manager.js';
import { authMiddleware } from '../middlewares/auth-middleware.js';
import { User, UserModel } from '../models/user.js';
import { AuthService } from '../services/auth-service.js';
import { DatabaseService } from '../services/database-service.js';

const router = Router();
const authManager = new AuthManager();
const bcryptManager = new BcryptManager();
const documentManager = new DocumentManager();
const validatorManager = new ValidatorManager( User );
const databaseService = new DatabaseService( UserModel );
const authService = new AuthService( databaseService, validatorManager, bcryptManager, documentManager );
const authController = new AuthController( authService, authManager );

router.post( '/signin', authController.signIn );
router.post( '/signup', authController.signUp );
router.get( '/signout', authMiddleware, authController.signOut );
router.get( '/refresh', authMiddleware, authController.refresh );
router.get( '/me', authMiddleware, authController.me );

export { router as authRouter };