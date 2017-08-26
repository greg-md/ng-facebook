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
