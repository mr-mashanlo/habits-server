import moment from 'moment';

import { DatabaseController } from './database-controller.js';

export class HabitController extends DatabaseController {

  create = async ( req, res, next ) => {
    try {
      const user = req.user;
      const data = req.body;
      const validatedData = this.validatorManager.parse( data );
      const date = moment().format( 'YYYYMMDD' );
      const document = await this.databaseService.create( { user, createdAt: date, startDate: date, ...validatedData } );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  upgradeMany = async ( req, res, next ) => {
    try {
      const user = req.user;
      const { data } = req.body;
      const validatedData = this.validatorManager.parseMany( data );
      const date = moment().format( 'YYYYMMDD' );
      const promises = validatedData.map( item => item._id ? item.title.length ? this.databaseService.update( { _id: item._id }, { title: item.title } ) : this.databaseService.remove( { _id: item._id } ) : this.databaseService.create( { user, createdAt: date, startDate: date, title: item.title } ) );
      const document = await Promise.all( promises );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

}