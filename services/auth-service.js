export class AuthService {

  constructor( databaseService, validatorManager, bcryptManager, documentManager ) {
    this.databaseService = databaseService;
    this.validatorManager = validatorManager;
    this.bcryptManager = bcryptManager;
    this.documentManager = documentManager;
  };

  signIn = async ( data ) => {
    const { email, password } = this.validatorManager.parse( data );
    const document = await this.databaseService.getOne( { email } );
    this.documentManager.throwIfNotExists( document, 'Email' );
    this.bcryptManager.compare( password, document.password );
    return document;
  };

  signUp = async ( data ) => {
    const { email, password } = this.validatorManager.parse( data );
    const document = await this.databaseService.getOne( { email } );
    this.documentManager.throwIfExists( document, 'Email' );
    const hash = this.bcryptManager.hash( password );
    const createdDocument = await this.databaseService.create( { email, password: hash } );
    return createdDocument;
  };

};