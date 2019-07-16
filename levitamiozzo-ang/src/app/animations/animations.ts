import { trigger, state, style, animate, transition, query, group, animateChild } from '@angular/animations';

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('1 => *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%'
        }),
      ], { optional: true}),
      query(':enter', [
        style({ right: '-100%'})
      ], { optional: true}),
      query(':leave', animateChild(), { optional: true}),
      group([
        query(':leave', [
          animate('600ms ease-out', style({ right: '100%'}))
        ], { optional: true}),
        query(':enter', [
          animate('600ms ease-out', style({ right: '0%'}))
        ], { optional: true})
      ]),
      query(':enter', animateChild(), { optional: true}),
    ]),
    transition('* => 1', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ], { optional: true}),
      query(':enter', [
        style({ left: '-100%'})
      ], { optional: true}),
      query(':leave', animateChild(), { optional: true}),
      group([
        query(':leave', [
          animate('600ms ease-out', style({ left: '100%'}))
        ], { optional: true}),
        query(':enter', [
          animate('600ms ease-out', style({ left: '0%'}))
        ], { optional: true})
      ]),
      query(':enter', animateChild()),
    ]),
    transition('2 => *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%'
        }),
      ], { optional: true}),
      query(':enter', [
        style({ right: '-100%'})
      ], { optional: true}),
      query(':leave', animateChild(), { optional: true}),
      group([
        query(':leave', [
          animate('600ms ease-out', style({ right: '100%'}))
        ], { optional: true}),
        query(':enter', [
          animate('600ms ease-out', style({ right: '0%'}))
        ], { optional: true})
      ]),
      query(':enter', animateChild(), { optional: true}),
    ]),
    transition('* => 2', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ], { optional: true}),
      query(':enter', [
        style({ left: '-100%'})
      ], { optional: true}),
      query(':leave', animateChild(), { optional: true}),
      group([
        query(':leave', [
          animate('600ms ease-out', style({ left: '100%'}))
        ], { optional: true}),
        query(':enter', [
          animate('600ms ease-out', style({ left: '0%'}))
        ], { optional: true})
      ]),
      query(':enter', animateChild(), { optional: true}),
    ]),
    transition('3 => *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%'
        }),
      ], { optional: true}),
      query(':enter', [
        style({ right: '-100%'})
      ], { optional: true}),
      query(':leave', animateChild(), { optional: true}),
      group([
        query(':leave', [
          animate('600ms ease-out', style({ right: '100%'}))
        ], { optional: true}),
        query(':enter', [
          animate('600ms ease-out', style({ right: '0%'}))
        ], { optional: true})
      ]),
      query(':enter', animateChild(), { optional: true}),
    ]),
    transition('* => 3', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ], { optional: true}),
      query(':enter', [
        style({ left: '-100%'})
      ], { optional: true}),
      query(':leave', animateChild(), { optional: true}),
      group([
        query(':leave', [
          animate('600ms ease-out', style({ left: '100%'}))
        ], { optional: true}),
        query(':enter', [
          animate('600ms ease-out', style({ left: '0%'}))
        ], { optional: true})
      ]),
      query(':enter', animateChild()),
    ]),
    transition('4 => *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%'
        }),
      ], { optional: true}),
      query(':enter', [
        style({ right: '-100%'})
      ], { optional: true}),
      query(':leave', animateChild(), { optional: true}),
      group([
        query(':leave', [
          animate('600ms ease-out', style({ right: '100%'}))
        ], { optional: true}),
        query(':enter', [
          animate('600ms ease-out', style({ right: '0%'}))
        ], { optional: true})
      ]),
      query(':enter', animateChild(), { optional: true}),
    ]),
    transition('* => 4', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ], { optional: true}),
      query(':enter', [
        style({ left: '-100%'})
      ], { optional: true}),
      query(':leave', animateChild(), { optional: true}),
      group([
        query(':leave', [
          animate('600ms ease-out', style({ left: '100%'}))
        ], { optional: true}),
        query(':enter', [
          animate('600ms ease-out', style({ left: '0%'}))
        ], { optional: true})
      ]),
      query(':enter', animateChild()),
    ]),
    transition('5 => *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%'
        }),
      ], { optional: true}),
      query(':enter', [
        style({ right: '-100%'})
      ], { optional: true}),
      query(':leave', animateChild(), { optional: true}),
      group([
        query(':leave', [
          animate('600ms ease-out', style({ right: '100%'}))
        ], { optional: true}),
        query(':enter', [
          animate('600ms ease-out', style({ right: '0%'}))
        ], { optional: true})
      ]),
      query(':enter', animateChild(), { optional: true}),
    ]),
    transition('* => 5', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ], { optional: true}),
      query(':enter', [
        style({ left: '-100%'})
      ], { optional: true}),
      query(':leave', animateChild(), { optional: true}),
      group([
        query(':leave', [
          animate('600ms ease-out', style({ left: '100%'}))
        ], { optional: true}),
        query(':enter', [
          animate('600ms ease-out', style({ left: '0%'}))
        ], { optional: true})
      ]),
      query(':enter', animateChild()),
    ])
  ]);
