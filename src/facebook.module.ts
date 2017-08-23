import {NgModule, ModuleWithProviders} from '@angular/core';

import {FacebookParseDirective} from './facebook-parse.directive';

import {FacebookService} from './facebook.service';

@NgModule({
    declarations: [
        FacebookParseDirective,
    ],
    exports: [
        FacebookParseDirective,
    ],
    providers: [
        FacebookService,
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
