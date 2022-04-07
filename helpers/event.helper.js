import { fromEvent, map } from 'rxjs';

export const $windowScrollEventHook = () => fromEvent( document, 'scroll' ).pipe(
  map( _ => [ window.scrollY, window.scrollX ] )
);
