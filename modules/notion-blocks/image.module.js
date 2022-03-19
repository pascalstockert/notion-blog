import { getBlockImageNaturalSize, getBlockImageUrl } from '/helpers/notion.helper';
import { LazyImageModule } from '../lazy-image.module';
import { useEffect, useRef, useState } from 'react';
import { getParentClientSize } from '../../helpers/utility.helper';

export const ImageModule = ( props ) => {
  const [ relativeImageHeight, setRelativeImageHeight ] = useState( '' );

  const imageRef = useRef(null);

  const { block } = props;
  const [ imageWidth, imageHeight ] = getBlockImageNaturalSize( block );

  useEffect( () => {
    if ( imageRef.current ) {
      const cardWidth = getParentClientSize( imageRef.current )[0] - 64;
      const ratio = cardWidth / imageWidth;
      setRelativeImageHeight( `${ imageHeight * ratio }px` )
    }
  }, [] );

  return (
    <div ref={ imageRef }
         className="w-100">
      <LazyImageModule src={ getBlockImageUrl( block ) }
                       height={ relativeImageHeight }
                       className="post-image" />
    </div>
  )
}
