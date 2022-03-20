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
