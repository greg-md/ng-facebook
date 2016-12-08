# Facebook sdk for Angular2

[![npm version](https://badge.fury.io/js/%40greg-md%2Fng-facebook.svg)](https://badge.fury.io/js/%40greg-md%2Fng-facebook)
[![Build Status](https://travis-ci.org/greg-md/ng-facebook.svg?branch=master)](https://travis-ci.org/greg-md/ng-facebook)

Using Facebook sdk with Angular2.

# Features

1. Multi-Language initialization support with changing languages in real time;
2. Lazy loading Facebook plugins when they appears in viewport.

# Installation

```bash
npm install @greg-md/ng-facebook --save
```

# Setting up in a module

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// 1. Import Facebook module;
import { FacebookModule } from '@greg-md/ng-facebook';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    // 2. Register Facebook module with it's providers.
    FacebookModule.forRoot()
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

# Using in components/views

```typescript
import { Component, OnInit } from '@angular/core';
import { FacebookService } from '@greg-md/ng-facebook';

@Component({
  selector: 'app-root',
  template: `
    <a tabindex="0" (click)="changeLanguage('en_EN')">English</a>
    |
    <a tabindex="0" (click)="changeLanguage('ro_RO')">Romanian</a>
    
    <div gg-fb-parse>
      <div class="fb-like"
        data-href="http://greg.md"
        data-layout="standard"
        data-action="like"
        data-size="small"
        data-show-faces="true"
        data-share="true"></div>
    </div>
  `,
})
export class AppComponent implements OnInit {
  constructor(public facebook: FacebookService) { }

  ngOnInit() {
    this.facebook.init();
  }
  
  changeLanguage(newLanguage) {
    this.facebook.init({}, newLanguage);
  }
}
```

# FacebookService

`FacebookService` works directly with Facebook sdk.

## Methods

Below is a list of supported methods of the [FacebookService](#facebookservice):

* [init](#init) - Load and initialize Facebook sdk;
* [parse](#parse) - Parse Facebook plugins from a HTMLElement;
* [then](#then) - Execute something after Facebook successfully initialized;
* [catch](#catch) - Execute something if Facebook couldn't be initialized.

## init

Load and initialize Facebook sdk.

```typescript
init(params: FacebookDefaults = {}, lang: string = 'en_US'): Promise
```

`params` - The same as [FB.init(params)](https://developers.facebook.com/docs/javascript/reference/FB.init/v2.8) parameters;  
`lang` - Facebook sdk language. See [Localization & Translation](https://developers.facebook.com/docs/internationalization).

_Example:_

```typescript
import { Injectable } from '@angular/core';

import { FacebookService } from '@greg-md/ng-facebook';

@Injectable()
export class AppService {
  constructor(public facebook: FacebookService) { }

  loadAndInitFacebook() {
    return this.facebook.init();
  }
  
  changeFacebookSettings() {
    return this.facebook.init({
      appId : '{your-app-id}',
      version: 'v2.7'
    }, 'ro_RO');
  }
}
```

## parse

Parse Facebook plugins from a HTMLElement.

```typescript
parse(element: HTMLElement): Promise
```

`element` - An HTMLElement.

_Example:_

```typescript
import { Component, OnInit, ElementRef } from '@angular/core';

import { FacebookService } from '@greg-md/ng-facebook';

@Component({
  selector: 'facebook-page',
  template: `
    <h2>We on Facebook!</h2>
    
    <div class="fb-page" 
      data-href="https://www.facebook.com/facebook"
      data-width="380" 
      data-hide-cover="false"
      data-show-facepile="false" 
      data-show-posts="false"></div>
  `,
})
export class WidgetComponent implements OnInit {
  constructor(private: elementRef: ElementRef, private facebook: FacebookService) { }

  ngOnInit() {
    this.facebook.parse(this.elementRef.nativeElement);
  }
}
```

## then

Execute something after Facebook successfully initialized.

```typescript
then(callable: () => {}): Promise
```

`callable` - Any callable function.

## catch

Execute something if Facebook couldn't be initialized.

```typescript
then(callable: () => {}): Promise
```

`callable` - Any callable function.

# Parse directive

Parse Facebook plugins from current container.

_Example:_


```html
<div gg-fb-parse>
  <div class="fb-like"
    data-href="http://greg.md"
    data-layout="standard"
    data-action="like"
    data-size="small"
    data-show-faces="true"
    data-share="true"></div>
</div>
```

## Attributes

### threshold

By default plugins are loaded when they appear on the screen.
If you want plugins to load earlier, use threshold parameter.
Setting threshold to 200 causes image to load 200 pixels before it appears on viewport.

_Example:_

```html
<img src="loading.jpg" gg-lazy-load="lazy-image.jpg" threshold="200" />
```

### container

You can also use directive for plugins inside scrolling container,
such as div with scrollbar. Just pass the container element.

_Example:_

```html
<div #container>
    <img src="loading.jpg" gg-lazy-load="lazy-image.jpg" [container]="container" />
</div>
```

# License

MIT © [Grigorii Duca](http://greg.md)
