import { useEffect, useRef, useState } from 'react';
import { getInnerDimensions, getScrollDimensions } from '../helpers/utility.helper';

// TODO hide scrollbar when areaScrollHeight <= wrapperScrollHeight
// TODO hide scrollbar when it's not being used
// TODO re-show scrollbar when it's being used or cursor comes close
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

    setScrollbarHeight( `${ ( wrapperScrollHeight / areaScrollHeight ) * 100 }%` )
  }

  const handleScroll = () => {
    const [ area, wrapper ] = [ areaRef.current, wrapperRef.current, scrollbarRef.current ];
    const [ areaScrollHeight ] = getScrollDimensions( area );
    const [ wrapperScrollHeight ] = getInnerDimensions( wrapper );

    setScrollbarOffset( `${ ( wrapperScrollHeight / areaScrollHeight ) * area.scrollTop }px` );
  }

  useEffect( () => {
    window.addEventListener( 'resize', () => {
      scrollbarSetup();
      handleScroll();
    } );

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
