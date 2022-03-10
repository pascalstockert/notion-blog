import { notionClient } from "./clients"; 

export default function handler( req, res ) {
  const limit = ( Number( req.query.limit ) || 5 );

  notionClient.databases.query( {
    database_id: process.env.NOTION_DB_ID,
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
