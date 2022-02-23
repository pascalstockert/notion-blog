import { Express } from 'express';

export class Endpoint {

  app: Express;
  prefix = '';

  constructor( app: Express, prefix = '' ) {
    this.app = app;
    this.prefix = [ this.prefix, prefix ].join('/');
  }

}
