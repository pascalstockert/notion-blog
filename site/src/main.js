// SCSS IMPORT FOR AOT COMPILATION //

import './scss/style.scss';


// API INTERACTION //

const _api = process.env.NODE_ENV === 'development'
  ? process.env.API_URL_DEV
  : process.env.API_URL_PROD;

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
    image.addEventListener( 'load', () => resolve( { height: image.height, width: image.width } ) );
    image.addEventListener( 'error', reject );
    image.src = src;
  } );
}

const postBodyTag = document.querySelector( '.post-body' );
function lazyLoadImage( targetDivTag ) {
  const randomLazyClassNumber = Math.max( 1, Math.floor( Math.random() * 10 ) );
  targetDivTag.classList.add( 'lazy-color-' + randomLazyClassNumber );

  loadImage( targetDivTag.dataset.src )
    .then( ( dimensions ) => {
      console.log({dimensions})
      targetDivTag.classList.add( 'loaded' );
      targetDivTag.style.backgroundImage = `url("${ targetDivTag.dataset.src }")`;
      targetDivTag.style.height = `${ ( postBodyTag.clientWidth / dimensions.width ) * dimensions.height }px`;
    } )
    .catch( () => console.error( 'Could not lazy-load image: ', { targetDivTag } ) );
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

function renderNotionBlock( block, parentElement ) {
  switch ( block.type ) {

    case 'paragraph':
      if ( !block.paragraph.text.length ) { return; }

      const paragraphElement = document.createElement( 'p' );
      paragraphElement.innerText = block.paragraph.text[0].plain_text;
      parentElement.appendChild( paragraphElement )
      break;

    case 'image':
      const divElement = document.createElement( 'div' );
      divElement.classList.add( 'post-image' );
      divElement.classList.add( 'bg-lazy-load' );
      divElement.dataset.src = block.image.file.url;
      parentElement.appendChild( divElement );
      break;

  }
}

if ( window.location.pathname.includes( 'posts/' ) ) {
  const postId = window.location.pathname.split( '/' ).pop();

  if ( postId ) {

    promiseList.push(
      getPost( postId ).then( postData => {
        document.querySelector( 'h1' ).innerText = postData.properties.Page.title[0].plain_text;
        const postHeader = document.querySelector( '.post-header' );
        const imageUrl = postData.cover?.file?.url;

        if ( imageUrl ) {
          postHeader.dataset.src = imageUrl;
        } else {
          postHeader.classList.add( 'd-none' );
        }

      } )
    );

    promiseList.push(
      getPostBlocks( postId ).then( postBlocks => {
        const postBodyElement = document.querySelector( '.post-body' );
        console.log( { postBlocks } );
        postBlocks.forEach( block => {
          renderNotionBlock( block, postBodyElement );
        } );
      } )
    );
  }

}

Promise.all( promiseList ).then( () => {
  cardRef.classList.add( 'loaded' );

  Array.from( document.querySelectorAll( '.bg-lazy-load:not(.d-none)' ) ).forEach( divElement => {
    lazyLoadImage( divElement );
  } );

} );
