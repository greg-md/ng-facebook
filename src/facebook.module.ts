import {NgModule, ModuleWithProviders} from '@angular/core';
import {FacebookService} from './facebook.service';
import {FacebookParseDirective} from './facebook-parse.directive';

@NgModule({
    declarations: [
        FacebookParseDirective,
    ],
    exports: [
        FacebookParseDirective,
    ]
})
export class FacebookModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: FacebookModule,
            providers: [FacebookService]
        };
    }
}
