import Link from 'next/link'
import { LazyImageModule } from './lazy-image.module';
import { getPageCover, getPageIceBreaker, getPageTitle } from '../helpers/notion.helper';
import { useRouter } from 'next/router';

export default function PostTeaserModule( props ) {
  const { pages, onClick } = props;

  const router = useRouter()

  const teaserElements = pages.map( page => {
    const navigateToPage = () => {
      onClick ? onClick.fn( onClick.param ) : {};
      setTimeout( () => {
        router.push( `/posts/${ page.id }` );
      }, 300);
    }

    return (
      <div key={ page.id }
           className="post-teaser"
           onClick={ navigateToPage }>

        <LazyImageModule src={ getPageCover( page ) }
                         height="96px" />

        <div>

          <h3>{ getPageTitle( page ) }</h3>
          <p>{ getPageIceBreaker( page ) }</p>

        </div>

      </div>
    );
  } );

  return (
    <div className="d-flex flow-col g-16 w-100">

      { teaserElements }

    </div>
  );
}
