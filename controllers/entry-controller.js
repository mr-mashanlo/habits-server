import { DatabaseController } from './database-controller.js';

export class EntryController extends DatabaseController {

  getMany = async ( req, res, next ) => {
    try {
      const user = req.user;
      const { from, to } = req.query;
      const document = await this.databaseService.getMany( { user, date: { $gte: from, $lte: to } }, { limit: 0 } );
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
      const promises = validatedData.map( item => item._id ? this.databaseService.update( { _id: item._id }, { done: item.done } ) : this.databaseService.create( { user, habit: item.habit, date: item.date, done: item.done } ) );
      const document = await Promise.all( promises );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

}