import { Express } from 'express';

export class Endpoint {

  app: Express;
  prefix = '';

  constructor( app: Express, prefix = '' ) {
    this.app = app;
    this.prefix = [ this.prefix, prefix ].join('/');
  }

  public addGetRoute( routeName: string, callback: ( req: any, res: any ) => void ): Endpoint {
    this.app.get( `${ this.prefix }/${ routeName }`, callback );
    return this;
  }

}
