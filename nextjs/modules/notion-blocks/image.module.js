import { getBlockImageUrl } from '/helpers/notion.helper';
import { LazyImageModule } from '../lazy-image.module';

export const ImageModule = ( props ) => {
  const { block } = props;

  return (
    <LazyImageModule src={ getBlockImageUrl( block ) }
                     className="post-image" />
  )
}
