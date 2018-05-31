import { sandboxOf } from 'angular-playground';
import { APP_INITIALIZER } from '@angular/core';
import { FacebookPageComponent, FacebookService } from '@greg-md/ng-facebook';

export default sandboxOf(FacebookPageComponent, {
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
.add('Facebook page', {
  template: `
    <p>Facebook Page:</p>
    <fb-page href="https://www.facebook.com/facebook/"></fb-page>
  `,
});
