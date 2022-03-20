import Head from 'next/head';
import Link from 'next/link'
import { useState } from 'react';
import { LazyImageModule } from '../../modules/lazy-image.module';
import {
  getPages,
  getPage,
  getPageBlocks,
  getPageTitle,
  getPageCover,
  resolveNotionBlock,
  getPageTags
} from '../../helpers/notion.helper';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome
} from "@fortawesome/free-solid-svg-icons";
import { ScrollArea } from '../../modules/scroll-area.module';

export default function Post( { page, pageBlocks } ) {
  const [ cardShown, setCardShown ] = useState( false );

  const pageTags = getPageTags( page );
  const resolvedBlocks = pageBlocks.map( block => resolveNotionBlock( block ) );

  const showCard = () => setCardShown( true );

  const interactionElements = [
    <Link key="home"
          href="/">
      <a tabIndex="0"
         className="interaction home">
        <FontAwesomeIcon icon={ faHome } />
        <span>Home</span>
      </a>
    </Link>
  ];

  const tagElements = pageTags.map( tag => (
    <span key={ tag.id }
          className={ `tag ${ tag.name.toLowerCase().split(' ').join('-') }` }>
      { tag.name }
    </span>
  ) );

  return (
    <ScrollArea>

      <div className="container p-y-128">

        <p className="p-fixed center-abs z-underneath">loading :)</p>

        <div id="card"
             className={ `w-100 br-8 shadow z-base loading${ cardShown ? ' loaded' : '' }` }>

          <div className="interaction-wrapper">
            { interactionElements }
          </div>

          <div className="tag-wrapper">
            { tagElements }
          </div>

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

    </ScrollArea>
  );
}

export async function getStaticProps( { params } ) {
  const pageRequest = getPage( params.id );
  const pageBlocksRequest = getPageBlocks( params.id );

  const [ page, pageBlocks ] = await Promise.all( [ pageRequest, pageBlocksRequest ] );

  return {
    props: { page, pageBlocks: pageBlocks.results },
    revalidate: 30000,
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
