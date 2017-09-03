import {NgModule, ModuleWithProviders, InjectionToken} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FacebookService} from './facebook.service';
import {FacebookParseDirective} from './parse.directive';
import {FacebookPageComponent} from './page.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    FacebookParseDirective,
    FacebookPageComponent,
  ],
  exports: [
    FacebookParseDirective,
    FacebookPageComponent,
  ],
})
export class FacebookModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FacebookModule,
      providers: [
        FacebookService,
      ],
    };
  }
}
