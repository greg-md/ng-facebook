import { sandboxOf } from 'angular-playground';
import { APP_INITIALIZER } from '@angular/core';
import { FacebookLikeComponent, FacebookService } from '@greg-md/ng-facebook';

export default sandboxOf(FacebookLikeComponent, {
  providers: [
    FacebookService,
    {
      provide: APP_INITIALIZER,
      useFactory: (facebookService: FacebookService) => {
        return () => {
          facebookService.init().subscribe();
        };
      },
      deps: [FacebookService],
      multi: true,
    },
  ]
})
.add('default', {
  template: `
    <p>Default button:</p>
    <fb-like></fb-like>
  `,
})
.add('with custom href', {
  template: `
    <p>Google like button:</p>
    <fb-like href="http://google.com/"></fb-like>
  `,
});
