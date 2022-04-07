import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPaperPlane, faLink } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import Link from 'next/link'

export default function SideNavModule( props ) {
  const { hidden } = props;

  const [ isHidden, setIsHidden ] = useState( true );

  useEffect( () => {
    setIsHidden( hidden );
  }, [ props ] );

  return (
    <div className={ `side-nav-wrapper${ isHidden ? ' hidden' : '' }` }>

      <Link href={ '/' }>
        <div className="icon-wrapper home">
          <FontAwesomeIcon icon={ faHome } />
        </div>
      </Link>

      {/* TODO add sharing */}
      {/*<Link>
        <div className="icon-wrapper link">
          <FontAwesomeIcon icon={ faLink } />
        </div>
      </Link>*/}

      <Link href={ 'mailto:shout@pasu.me' }>
        <div className="icon-wrapper contact">
          <FontAwesomeIcon icon={ faPaperPlane } />
        </div>
      </Link>

    </div>
  );
}

