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
