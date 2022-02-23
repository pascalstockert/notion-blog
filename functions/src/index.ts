import * as functions from 'firebase-functions';
import * as express from 'express';

import * as Endpoints from './classes';

const app = express();

new Endpoints.Docs( app, 'docs' );

exports.app = functions.https.onRequest( app );
