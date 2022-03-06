// API INTERACTION //

const _api = 'https://pasu.me/api';
// const _api = 'http://localhost:5001/pasu-notion-blog/us-central1/api/api';

const configGet = {
  headers: {
    'method': 'GET',
    'Content-Type': 'application/json'
  }
}

async function getPosts( limit = 10 ) {
  return (
    await (
      ( await fetch( `${ _api }/posts?limit=${ limit }`, configGet ) ).json()
    )
  ).results;
}

async function getPost( id ) {
  return (
    await (
      ( await fetch( `${ _api }/posts/${ id }`, configGet ) ).json()
    )
  );
}

async function getPostBlocks( id ) {
  return (
    await (
      ( await fetch( `${ _api }/blocks/${ id }`, configGet ) ).json()
    )
  ).results;
}


// DOM INTERACTION //

const promiseList = [];

const images = [
  'joey-1',
  'joey-2',
  'joey-3',
  'joey-4',
  'joey-5',
  'joey-6',
  'landscape-1',
];

function loadImage( src ) {
  return new Promise( ( resolve, reject ) => {
    const image = new Image();
    image.addEventListener( 'load', resolve );
    image.addEventListener( 'error', reject );
    image.src = src;
  } );
}

const cardRef = document.getElementById( 'card' );
const header = document.querySelector('.header');
if ( cardRef && header ) {
  const imageIndex = Math.floor( Math.random() * ( images.length ) );

  promiseList.push(
    loadImage( `/assets/images/${ images[ imageIndex ] }.jpg` ).then( () => {
      header.style.backgroundImage = `url("/assets/images/${ images[ imageIndex ] }.jpg")`;
    } )
  );
}

const propagationElements = document.querySelectorAll( '.load-on-propagate' );
if ( propagationElements.length ) {
  propagationElements.forEach( element => {
    element.addEventListener( 'click', event => {
      event.preventDefault();
      cardRef.classList.remove( 'loaded' );
      setTimeout( () => {
        window.location = element.href;
      }, 300 );
    } );
  } );
}

const postPreview = document.querySelectorAll( '.post-preview' );
if ( postPreview.length ) {
  promiseList.push(
    getPosts().then( posts => posts.forEach( ( post ) => {
      console.log( post );
      const cover = post.cover?.file.url;
      const heading = post.properties.Page.title[0].plain_text;
      const iceBreaker = post.properties['Ice Breaker'].rich_text[0].plain_text;

      const component = `
        ${ cover ? `<img src="${ cover }" alt="post image"/>` : '' }
        <div>
          <h3>${ heading }</h3>
          <p>${ iceBreaker }</p>
        </div>
      `;

      const previewPost = document.createElement( 'div' );
      previewPost.classList.add('post');

      previewPost.innerHTML = component;
      previewPost.addEventListener( 'click', () => {
        cardRef.classList.remove( 'loaded' );
        setTimeout( () => {
          window.location = `/posts/${ post.id }`;
        }, 300 );
      } );
      postPreview.forEach( previewRow => {
        previewRow.appendChild( previewPost );
      } );

    } ) )
  );
}


// POST DETAIL //

if ( window.location.pathname.includes( 'posts/' ) ) {
  const postId = window.location.pathname.split( '/' ).pop();

  if ( postId ) {
    promiseList.push(
      new Promise( resolve => {

        getPost( postId ).then( postData => {
          document.querySelector( 'h1' ).innerText = postData.properties.Page.title[0].plain_text;
          const postHeader = document.querySelector( '.post-header' );
          const imageUrl = postData.cover?.file?.url;

          if ( imageUrl ) {
            loadImage( imageUrl ).then( () => {
              postHeader.style.backgroundImage = `url("${ imageUrl }")`;
              resolve();
            } );
          } else {
            postHeader.classList.add( 'd-none' );
            resolve();
          }

        } )

      } )
    );

    promiseList.push(
      getPostBlocks( postId ).then( postBlocks => {
        console.log( { postBlocks } );
      } )
    );
  }

}

Promise.all( promiseList ).then( () => {
  cardRef.classList.add( 'loaded' );
} );
