import jwt from 'jsonwebtoken';

import { ErrorManager } from './error-manager.js';

export class AuthManager {

  issue = ( res, payload ) => {
    const token = jwt.sign( payload, process.env.SECRET_KEY, { expiresIn: '2h' } );
    res.cookie( 'token', token, { maxAge: 7_200_000, httpOnly: true, sameSite: 'none', secure: true } );
    return { token, expired: Date.now() + 7_200_000 };
  };

  revoke = ( res ) => {
    return res.clearCookie( 'token' );
  };

  verify = ( token ) => {
    try {
      return jwt.verify( token, process.env.SECRET_KEY );
    } catch ( error ) {
      throw new ErrorManager( { status: 400, issues: [ { name: 'token', message: error.message } ] } );
    }
  };

}