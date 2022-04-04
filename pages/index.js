import Head from 'next/head'
import { LazyImageModule } from '/modules/lazy-image.module';
import { useState } from 'react';
import { getPages } from '../helpers/notion.helper';
import PostTeaserModule from '../modules/post-teaser.module';

export default function Home( { latestPages } ) {
  const [ cardShown, setCardShown ] = useState( false );

  const images = [
    'joey-1',
    'joey-2',
    'joey-3',
    'joey-4',
    'joey-5',
    'joey-6',
    'landscape-1',
  ].map( image => `/images/${ image }.jpg` );

  const showCard = () => {
    setCardShown( true );
  }

  return (
    <div className="container p-y-128">

      <p className="p-fixed center-abs z-underneath">loading :)</p>

      <div id="card"
           className={ `w-100 br-8 shadow z-base loading${ cardShown ? ' loaded' : '' }` }>

        <LazyImageModule src={ images }
                         className="header"
                         height="384px"
                         onLoad={ showCard } />

        <div className="body">

          <h1>Hello 👋</h1>

          <p>
            Hi, I'm Pascal "Pasu" Stockert - a web developer based in Leipzig, Germany!{'\n'}
            While I love to explore all aspects behind web-apps I mostly dabble with shapes and colors.
          </p>

          <p>
            As everyone and their mother has a blog nowadays, why not start my own?{'\n'}
            Look forward to the usual stuff - (somewhat) useful code snippets, (barely) exciting stories from my
            life and insights into my work (very original).
          </p>

          <p>
            As I'm fairly new to writing, please don't expect all toooo frequent uploads.{'\n'}
            Let's pretend I'm going for quality over quantity!
          </p>

          <h2>My latest posts</h2>

          <PostTeaserModule pages={ latestPages } onClick={ { fn: setCardShown, param: false } } />

        </div>

      </div>
    </div>
  );
}

export async function getStaticProps() {
  const latestPages = ( await getPages( 2 ) ).results;

  return {
    props: { latestPages },
    revalidate: 30000,
  };

}
