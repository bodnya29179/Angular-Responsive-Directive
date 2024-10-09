import { fromEvent } from 'rxjs';
import { debounceTime, shareReplay, startWith } from 'rxjs/operators';

export const WINDOW_RESIZE$ = fromEvent(window, 'resize')
  .pipe(
    startWith(null),
    debounceTime(200),
    shareReplay({ refCount: true, bufferSize: 1 }),
  );
