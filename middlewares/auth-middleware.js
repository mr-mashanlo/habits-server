import { AuthManager } from '../helpers/auth-manager.js';
import { DocumentManager } from '../helpers/document-manager.js';

const authManager = new AuthManager();
const documentManager = new DocumentManager();

export const authMiddleware = async ( req, res, next ) => {
  try {
    const token = req.cookies.token;
    documentManager.throwIfNotExists( token, 'Token', 401 );

    const { id, exp } = authManager.verify( token );
    req.user = { id };

    const time = exp - Math.floor( Date.now() / 1000 );
    if ( time < 1800 ) authManager.issue( res, { id } );

    next();
  } catch ( error ) {
    next( error );
  }
};