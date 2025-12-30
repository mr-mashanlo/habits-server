import z from 'zod';

import { ErrorManager } from './error-manager.js';

export class ValidatorManager {

  constructor( schema ) {
    this.schema = schema;
  }

  parse = data => {
    try {
      return this.schema.parse( data );
    } catch ( error ) {
      throw new ErrorManager( { status: 400, issues: error.issues.map( error => ( { name: error.path[0], message: error.message } ) ) } );
    }
  };

  parseMany = data => {
    try {
      return z.array( this.schema ).parse( data );
    } catch ( error ) {
      throw new ErrorManager( { status: 400, issues: error.issues.map( error => ( { name: error.path[0], message: error.message } ) ) } );
    }
  };

}