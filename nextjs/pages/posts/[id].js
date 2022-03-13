import Head from 'next/head';
import { getPages, getPage, getPageBlocks, getPageTitle, getPageCover, resolveNotionBlock } from '../../helpers/notion.helper';
import { LazyImageModule } from '../../modules/lazy-image.module';

export default function Post( { page, pageBlocks } ) {
  console.log( { page, pageBlocks } );

  const resolvedBlocks = pageBlocks.map( block => resolveNotionBlock( block ) );

  return (
    <div className="container">

      <div id="card"
           className="w-100 br-8 shadow z-base loaded">

        <LazyImageModule src={ getPageCover( page ) }
                         height={ '256px' }
                         className="header" />

        <div className="p-32">

          <h1>{ getPageTitle( page ) }</h1>

          { resolvedBlocks }

        </div>

      </div>
    </div>
  );
}

export async function getStaticProps( { params } ) {
  const pageRequest = getPage( params.id );
  const pageBlocksRequest = getPageBlocks( params.id );

  const [ page, pageBlocks ] = await Promise.all( [ pageRequest, pageBlocksRequest ] );

  return {
    props: { page, pageBlocks: pageBlocks.results },
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
