import { useEffect, useRef, useState } from 'react';
import { getInnerDimensions, getScrollDimensions } from '../helpers/utility.helper';

export function ScrollArea( props ) {
  const { children } = props;

  const [ scrollbarHeight, setScrollbarHeight ] = useState( '0px' );
  const [ scrollbarOffset, setScrollbarOffset ] = useState( '0px' );

  const areaRef = useRef();
  const wrapperRef = useRef();
  const scrollbarRef = useRef();

  const scrollbarSetup = () => {
    const [ area, wrapper ] = [ areaRef.current, wrapperRef.current ];
    const [ areaScrollHeight ] = getScrollDimensions( area );
    const [ wrapperScrollHeight ] = getScrollDimensions( wrapper );

    console.log({wrapperScrollHeight, areaScrollHeight})

    setScrollbarHeight( `${ ( wrapperScrollHeight / areaScrollHeight ) * 100 }%` )

  }

  const handleScroll = () => {
    const [ area, wrapper ] = [ areaRef.current, wrapperRef.current, scrollbarRef.current ];
    const [ areaScrollHeight ] = getScrollDimensions( area );
    const [ wrapperScrollHeight ] = getInnerDimensions( wrapper );

    setScrollbarOffset( `${ ( wrapperScrollHeight / areaScrollHeight ) * area.scrollTop }px` );
  }

  useEffect( () => {
    scrollbarSetup();
  }, [ props ] );

  return (
    <div ref={ areaRef }
         className="scroll-area"
         onScroll={ handleScroll }>

      <div ref={ wrapperRef }
           className="scrollbar-wrapper">

        <div ref={ scrollbarRef }
             style={{ height: scrollbarHeight, marginTop: scrollbarOffset }}
             className="scrollbar" />

      </div>

      { children }

    </div>
  );

}
