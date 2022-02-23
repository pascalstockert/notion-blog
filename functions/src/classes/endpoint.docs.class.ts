import { Express } from 'express';
import { Endpoint } from './endpoint.class';
import { Client } from '@notionhq/client';

export class Docs extends Endpoint {

  notion = new Client( {
    auth: `${process.env.NOTION_TOKEN}`
  } );

  constructor( app: Express, prefix: string ) {
    super( app, prefix );

    app.get( `${ this.prefix }/finished`, ( req, res ) => {
      this.queryFinishedDocuments()
        .then( query => { res.status( 200 ).send( query ) } )
        .catch( err => { res.status(500).send( err ) } );
    } )
  }

  queryFinishedDocuments(): Promise<any> {
    return this.notion.databases.query( {
      database_id: `${process.env.NOTION_DB_ID}`,
      filter: {
        or: [
          {
            property: "Status",
            select: {
              equals: "Finished"
            }
          }
        ]
      }
    } );
  }

}
