import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';

import { Endpoint } from './classes/endpoint.class';
import { NotionService } from './classes/notion-service.class';

const app = express();
app.use( cors( { origin: true } ) );

new Endpoint( app, 'api' )
  .addGetRoute( 'posts', NotionService.queryPosts )
  .addGetRoute( 'posts/:postId', NotionService.queryPost )
  .addGetRoute( 'blocks/:postId', NotionService.queryPostBlocksById );


exports.api = functions.https.onRequest( app );
