export class AuthController {

  constructor( authService, authManager ) {
    this.authService = authService;
    this.authManager = authManager;
  };

  signIn = async ( req, res, next ) => {
    try {
      const { email, password } = req.body;
      const { _id: id } = await this.authService.signIn( { email, password } );
      const { token, expired } = this.authManager.issue( res, { id } );
      res.json( { id, token, expired } );
    } catch ( error ) {
      next( error );
    }
  };

  signUp = async ( req, res, next ) => {
    try {
      const { email, password } = req.body;
      const { _id: id } = await this.authService.signUp( { email, password } );
      const { token, expired } = this.authManager.issue( res, { id } );
      res.json( { id, token, expired } );
    } catch ( error ) {
      next( error );
    }
  };

  signOut = async ( req, res, next ) => {
    try {
      this.authManager.revoke( res );
      res.json( { ok: true } );
    } catch ( error ) {
      next( error );
    }
  };

  refresh = async ( req, res, next ) => {
    try {
      const { id } = req.user;
      const { token, expired } = this.authManager.issue( res, { id } );
      res.json( { id, token, expired } );
    } catch ( error ) {
      next( error );
    }
  };

  me = async ( req, res, next ) => {
    try {
      const { id } = req.user;
      res.json( { id } );
    } catch ( error ) {
      next( error );
    }
  };

};