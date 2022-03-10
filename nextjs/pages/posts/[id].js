import Head from 'next/head';

export default function Post( { postData, postBlocks } ) {
  console.log( { postData, postBlocks } );
  return (
    <>

      <Head>
        <title>Placeholder</title>
        <meta name="description" content="" />
      </Head>

      <h1>Placeholder</h1>

    </>
  )
}

export async function getStaticProps( { params } ) {
  const postDataRequest = fetch( `${ process.env.API_ROOT }/posts/${ params.id }` );
  const postBlocksRequest = fetch( `${ process.env.API_ROOT }/blocks/${ params.id }` );

  const [ postData, postBlocks ] = await Promise.all(
    ( await Promise.all( [ postDataRequest, postBlocksRequest ] ) )
      .map( response => response.json() )
  );

  return {
    props: { postData, postBlocks: postBlocks.results }
  };

}

export async function getStaticPaths() {
  const req = await fetch( `${ process.env.API_ROOT }/posts?limit=999` );
  const data = await req.json();

  const paths = data.results.map( page => {
    return { params: { id: page.id } };
  } )

  return {
    paths,
    fallback: false
  };
}
