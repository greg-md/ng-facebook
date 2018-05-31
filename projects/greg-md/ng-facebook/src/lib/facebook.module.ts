import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacebookParseDirective } from './parse.directive';
import { FacebookPageComponent } from './page.component';
import { FacebookLikeComponent } from './like.component';

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
export class FacebookModule { }
