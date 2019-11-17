import { animate, state, style, transition, trigger } from '@angular/animations';

// Component transition animations
export const scaleInOutAnimation =
  trigger('routeAnimation', [
    //   state('*', style({transform: 'translateX(0)', opacity: 1, position: 'relative'})),
    state('*', style({transform: 'translate(0%,0px)', opacity: 1})),
      transition('void => *', [
        style({transform: 'translate(100%,0px)', opacity: 0}),
        animate('.5s')
      ]),
      transition('* => void',
        animate('.5s', style({
          transform: 'translate(-100%,0px)',
          opacity: 0
      }))
      )
    ]);

export const fadeInOutAnimation =  trigger('routeAnimation', [
      state('*', style({opacity: 1})),
      transition('void => *', [
        style({opacity: 0}),
        animate('.35s cubic-bezier(0.215, 0.610, 0.355, 1.000)')
      ]),
      transition('* => void',
        animate('.35s cubic-bezier(0.215, 0.610, 0.355, 1.000)', style({
          opacity: 0
      }))
      )
    ]);
