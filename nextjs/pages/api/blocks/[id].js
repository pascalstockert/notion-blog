import { notionClient } from "../clients";

export default function blockHandler( req, res ) {
  const { id } = req.query;

  notionClient.blocks.children.list( {
    block_id: id
  } )
    .then( query => { res.status( 200 ).send( query ) } )
    .catch( err => { res.status( 500 ).send( err ) } );

}
