import Head from 'next/head';
import Link from 'next/link'
import { useEffect, useState } from 'react';
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
import { $windowScrollEventHook } from '../../helpers/event.helper';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome
} from "@fortawesome/free-solid-svg-icons";
import SideNavModule from '../../modules/side-nav.module';

export default function Post( { page, pageBlocks } ) {
  const [ cardShown, setCardShown ] = useState( false );
  const [ scrollValue, setScrollValue ] = useState( 0 );

  useEffect( () => {
    $windowScrollEventHook().subscribe( ([ scrollHeight ]) => {
      setScrollValue( scrollHeight )
    } );
  }, [] );

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
    <div className="container p-y-128">

      <SideNavModule hidden={ !( scrollValue >= 200 ) } />

      <p className="p-fixed center-abs z-underneath">loading :)</p>

      <div id="card"
           className={ `w-100 br-8 shadow z-base loading${ cardShown ? ' loaded' : '' }` }>

        <div className="nav-wrapper">

          <div className="interaction-wrapper">
            { interactionElements }
          </div>

          <div className="tag-wrapper">
            { tagElements }
          </div>

        </div>

        <LazyImageModule src={ getPageCover( page ) }
                         height={ '256px' }
                         className="header"
                         onLoad={ showCard } />

        <div className="body">

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
    revalidate: 1800,
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
