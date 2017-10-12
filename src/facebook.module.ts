import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';

import 'rxjs/add/operator/map';

import {FacebookService} from './facebook.service';
import {FacebookParseDirective} from './parse.directive';
import {FacebookPageComponent} from './page.component';
import {FacebookLikeComponent} from './like.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    FacebookParseDirective,
    FacebookPageComponent,
    FacebookLikeComponent,
  ],
  exports: [
    FacebookParseDirective,
    FacebookPageComponent,
    FacebookLikeComponent,
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
