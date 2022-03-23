export const isIterable = ( obj ) => {
  if ( obj == null ) {
    return false;
  }

  return typeof obj[ Symbol.iterator ] === 'function';
}

export const isString = ( obj ) => {
  if ( obj == null ) {
    return false;
  }

  return typeof obj === 'string';
}

export const getParentClientSize = ( ref ) => {
  return [ ref.parentElement?.clientWidth, ref.parentElement?.clientHeight ];
}

export const getScrollDimensions = ( node ) => {
  return [ node.scrollHeight, node.scrollWidth ];
}

export const getInnerDimensions = ( node ) => {
  const computedStyle = getComputedStyle( node );

  let width = node.clientWidth;
  let height = node.clientHeight;
  height -= parseFloat( computedStyle.paddingTop ) + parseFloat( computedStyle.paddingBottom );
  width -= parseFloat( computedStyle.paddingLeft ) + parseFloat( computedStyle.paddingRight );

  return [ height, width ];
}

export class Timer {
  ticks;
  active = false;
  currentMs = 0;
  interval;

  _callbacks = {};

  constructor ( interval = 3000 ) {
    this.interval = interval;
    this.ticks = setInterval( this.tick, 10 );
  }

  tick = () => {
    if ( this.active ) {
      this.currentMs += 10;

      if ( this.currentMs % this.interval === 0 ) {
        this.currentMs = 0;

        Object.keys( this._callbacks ).forEach( key => {
          this._callbacks[ key ]();
        } );

      }

    }
  }

  addCallback = ( key, callback ) => {
    this._callbacks[ key ] = callback;
    return this;
  }

  removeCallback = ( key ) => {
    if ( key in this._callbacks ) {
      delete this._callbacks[key];
    }
  }

  start = () => {
    this.active = true;
    return this;
  }

  stop = () => {
    this.active = false;
    return this;
  }

  reset = () => {
    this.currentMs = 0;
    return this;
  }

  kill = () => { clearInterval( this.ticks ); }
}
