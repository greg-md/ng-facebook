import {NgModule} from '@angular/core';
import {FacebookParseDirective} from './facebook-parse.directive';

@NgModule({
    declarations: [
        FacebookParseDirective,
    ],
    exports: [
        FacebookParseDirective,
    ]
})
export class FacebookModule { }
