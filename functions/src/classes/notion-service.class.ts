import { Client } from '@notionhq/client/build/src';

export class NotionService {

  static notionClient = new Client( {
    auth: `${ process.env.NOTION_TOKEN }`
  } );

  static queryPosts( req: any, res: any ): void {
    const limit = ( Number( req.query.limit ) || 5 );
    NotionService.notionClient.databases.query( {
      database_id: `${process.env.NOTION_DB_ID}`,
      page_size: limit,
      filter: {
        and: [
          {
            property: "Status",
            select: {
              equals: "Finished"
            }
          },
          {
            property: "Type",
            select: {
              equals: "Post"
            }
          }
        ]
      }
    } )
      .then( query => { res.status( 200 ).send( query ) } )
      .catch( err => { res.status( 500 ).send( err ) } );
  }

  static queryPostById( req: any, res: any ): void {
    const postId = String( req.params.postId );
    NotionService.notionClient.blocks.children.list( {
      block_id: postId
    } )
      .then( query => { res.status( 200 ).send( query ) } )
      .catch( err => { res.status( 500 ).send( err ) } );
  }

}
