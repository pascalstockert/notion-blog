import Head from 'next/head';
import { getPages, getPage, getPageBlocks } from '../../helpers/notion.helper';

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
  const postDataRequest = getPage( params.id );
  const postBlocksRequest = getPageBlocks( params.id );

  const [ postData, postBlocks ] = await Promise.all( [ postDataRequest, postBlocksRequest ] );

  return {
    props: { postData, postBlocks: postBlocks.results },
    revalidate: 86400,
  };

}

export async function getStaticPaths() {

  const query = await getPages( 999 );

  const paths = query.results.map( page => {
    return { params: { id: page.id } };
  } );

  return {
    paths,
    fallback: false,
  };

}
