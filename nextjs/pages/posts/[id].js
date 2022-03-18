import Head from 'next/head';
import { useState } from 'react';
import { LazyImageModule } from '../../modules/lazy-image.module';
import { getPages, getPage, getPageBlocks, getPageTitle, getPageCover, resolveNotionBlock } from '../../helpers/notion.helper';

export default function Post( { page, pageBlocks } ) {
  const [ cardShown, setCardShown ] = useState( false );

  const resolvedBlocks = pageBlocks.map( block => resolveNotionBlock( block ) );

  const showCard = () => setCardShown( true );

  return (
    <div className="container p-y-128">

      <p className="p-fixed center-abs z-underneath">loading :)</p>

      <div id="card"
           className={ `w-100 br-8 shadow z-base loading${ cardShown ? ' loaded' : '' }` }>

        <LazyImageModule src={ getPageCover( page ) }
                         height={ '256px' }
                         className="header"
                         onLoad={ showCard } />

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
    revalidate: 360000,
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
