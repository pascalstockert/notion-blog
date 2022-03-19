import { useEffect, useState } from 'react';
import { isString } from '/helpers/utility.helper';

export const LazyImageModule = ( props ) => {
  const [ imageSrc, setImageSrc ] = useState( '' );
  const [ imageLoaded, setImageLoaded ] = useState( false );
  const [ randomLazyClass, setRandomLazyClass ] = useState( '' );

  const { src, className, height, onLoad } = props;

  useEffect( () => {
    setRandomLazyClass( `lazy-color-${ Math.max( 1, Math.floor( Math.random() * 10 ) ) }` );

    if ( isString( src ) ) {
      setImageSrc( src );
    } else {
      setImageSrc( src[ Math.max( 0, Math.floor( Math.random() * ( src.length - 1 ) ) ) ] )
    }

  }, [] );

  return (
    <div className={ `lazy-image ${ randomLazyClass } ${ className } ${ imageLoaded ? 'loaded' : '' }` }
         style={{ height: height }}>

      <img src={ imageSrc }
           alt="image"
           style={{ height: height }}
           onLoad={ () => {
             setImageLoaded( true );
             onLoad ? onLoad() : {};
           } } />

    </div>
  )

}
