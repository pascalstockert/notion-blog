import * as functions from 'firebase-functions';
import * as express from 'express';

import { Endpoint } from './classes/Endpoint.class';
import { NotionService } from './classes/NotionService.class';

const app = express();

new Endpoint( app, 'api' )
  .addGetRoute( 'posts', NotionService.queryPosts )
  .addGetRoute( 'posts/:postId', NotionService.queryPostById );

exports.api = functions.https.onRequest( app );
