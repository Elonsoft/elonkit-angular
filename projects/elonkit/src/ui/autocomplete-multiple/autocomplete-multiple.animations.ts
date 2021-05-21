import { animate, state, style, transition, trigger } from '@angular/animations';

export const ES_AUTOCOMPLETE_ANIMATIONS = [
  trigger('panel', [
    state('void', style({ transform: 'scaleY(0.8)', opacity: 0 })),
    state('*', style({ opacity: 1, transform: 'scaleY(1)' })),
    transition('void => *', animate('120ms cubic-bezier(0, 0, 0.2, 1)')),
    transition('* => void', animate('100ms 25ms linear', style({ opacity: 0 })))
  ])
];
