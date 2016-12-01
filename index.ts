import {NgModule, ModuleWithProviders} from '@angular/core';
import {FacebookService} from './src/facebook.service';
import {FacebookParseDirective} from './src/facebook-parse.directive';

export * from './src/facebook.service';
export * from './src/facebook.utils';
export * from './src/facebook-parse.directive';

@NgModule({
    declarations: [
        FacebookParseDirective,
    ],
    exports: [
        FacebookParseDirective,
    ]
})
export default class FacebookModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: FacebookModule,
            providers: [FacebookService]
        };
    }
}
