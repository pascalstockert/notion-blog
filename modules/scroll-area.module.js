import { useEffect, useRef, useState } from 'react';
import { getInnerDimensions, getScrollDimensions, Timer } from '../helpers/utility.helper';

// TODO make scrollbar draggable
export function ScrollArea( props ) {
  const { children } = props;

  const [ scrollbarHeight, setScrollbarHeight ] = useState( '0px' );
  const [ scrollbarOffset, setScrollbarOffset ] = useState( '0px' );
  const [ scrollbarVisibility, setScrollbarVisibility ] = useState( true );
  const [ isUserDragging, setIsUserDragging ] = useState( false );

  const areaRef = useRef();
  const wrapperRef = useRef();
  const scrollbarRef = useRef();

  const timer = new Timer();

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
    timer.reset();
    setScrollbarVisibility( true );
  }

  useEffect( () => {
    timer
      .addCallback( 'hideScrollbar', () => { setScrollbarVisibility( false ) } )
      .start();
  }, [] );

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
           className={ `scrollbar-wrapper${ scrollbarVisibility ? '' : ' hidden' }` } >

        <div ref={ scrollbarRef }
             style={{ height: scrollbarHeight, marginTop: scrollbarOffset }}
             className="scrollbar" />

      </div>

      { children }

    </div>
  );

}
