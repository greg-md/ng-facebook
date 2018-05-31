import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FacebookModule } from '@greg-md/ng-facebook';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FacebookModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
