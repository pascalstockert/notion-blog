import { getPages } from '../../helpers/notion.helper';

export default async function handler(req, res) {
  if ( req.query.secret !== process.env.REVALIDATE_SECRET ) {
    return res.status( 401 ).json( { message: 'Invalid token' } );
  }

  try {
    // Revalidate landing
    await res.unstable_revalidate( '/' );

    // Revalidate post pages
    const query = await getPages( 999 );
    const paths = query.results.map( page => {
      return `/posts/${ page.id }`;
    } );
    for ( let i = 0; i < paths.length; i++ ) {
      await res.unstable_revalidate( paths[ i ] );
    }

    return res.json( { revalidated: true } );

  } catch ( err ) {
    return res.status( 500 ).send( 'Error revalidating' );
  }

}
