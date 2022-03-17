import { useEffect, useState } from 'react';
import { getParentClientSize, isString } from '/helpers/utility.helper';

export const LazyImageModule = ( props ) => {
  const [ imageSrc, setImageSrc ] = useState( '' );
  const [ imageLoaded, setImageLoaded ] = useState( false );
  const [ randomLazyClass, setRandomLazyClass ] = useState( '' );
  const [ relativeImageHeight, setRelativeImageHeight ] = useState( '384px' );

  const { src, className, height } = props;

  const setRelativeHeight = ( imageRef ) => {
    if ( !height ) {
      const [ containerWidth ] = getParentClientSize( imageRef )
      const ratio = containerWidth / imageRef.naturalWidth;
      setRelativeImageHeight( `${ imageRef.naturalHeight * ratio }px` );
    }
  }

  useEffect( () => {
    if ( !!height ) {
      setRelativeImageHeight( height );
    }
    setRandomLazyClass( `lazy-color-${ Math.max( 1, Math.floor( Math.random() * 10 ) ) }` );

    if ( isString( src ) ) {
      setImageSrc( src );
    } else {
      setImageSrc( src[ Math.max( 0, Math.floor( Math.random() * ( src.length - 1 ) ) ) ] )
    }

  }, [] );

  return (
    <div className={ `lazy-image ${ randomLazyClass } ${ className } ${ imageLoaded ? 'loaded' : '' }` }
         style={{ height: relativeImageHeight }}>

      <img src={ imageSrc }
           alt="image"
           style={{ height: relativeImageHeight }}
           onLoad={ ( image ) => {
             setRelativeHeight( image.target );
             setImageLoaded( true );
           } } />

    </div>
  )

}
