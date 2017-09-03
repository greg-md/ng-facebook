import {NgModule, ModuleWithProviders} from '@angular/core';

import {FacebookService} from './facebook.service';
import {FacebookParseDirective} from './parse.directive';

export * from './facebook.service';

@NgModule({
  declarations: [
    FacebookParseDirective,
  ],
  exports: [
    FacebookParseDirective,
  ],
})
export class FacebookModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FacebookModule,
      providers: [
        FacebookService,
      ]
    };
  }
}
