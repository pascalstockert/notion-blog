import { notionClient } from "../clients";

export default function postHandler( req, res ) {
  const { id } = req.query;
  
  notionClient.pages.retrieve( {
    page_id: id
  } )
    .then( query => { res.status( 200 ).send( query ) } )
    .catch( err => { res.status( 500 ).send( err ) } );

}
