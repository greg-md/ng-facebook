# Facebook sdk for Angular2

Using Facebook sdk with Angular2

# Features

1. Multi-Language initialization support;
2. Lazy loading plugins when they appears in viewport;

# Installation

```bash
npm install @greg-md/ng-facebook --save
```

# Setting up in a module

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// 1. Import Facebook module.
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
    <div gg-fb-parse>
      <div class="fb-like" data-href="http://greg.md" data-layout="standard" data-action="like" data-size="small" data-show-faces="true" data-share="true"></div>
    </div>
  `,
})
export class AppComponent implements OnInit {
  constructor(public facebook: FacebookService) { }

  ngOnInit() {
    this.facebook.init();
  }
}
```

# Services

## FacebookService

`FacebookService` works directly with Facebook sdk.

### Methods

#### init

Parse Facebook plugins from an HTMLElement.

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
  
  doSomethingAfterFacebookWasLoaded() {
    this.facebook.init().then(() => {
        alert('Facebook initialized!');
    });
  }
}
```

#### parse

Parse

```typescript
export interface FacebookDefaults {
    appId?: string,
    status?: boolean,
    xfbml?: boolean,
    version?: string,
}

init(params: FacebookDefaults = {}, lang: string = 'en_US')
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
    this.facebook.init();
  }
  
  changeFacebookSettings() {
    this.facebook.init({
      appId : '{your-app-id}',
      version: 'v2.7'
    }, 'ro_RO');
  }
}
```

# Directives

## [gg-fb-parse]

Parse Facebook plugins from current container.

_Example:_


```html
<div gg-fb-parse>
  <div class="fb-like" data-href="http://greg.md" data-layout="standard" data-action="like" data-size="small" data-show-faces="true" data-share="true"></div>
</div>
```

# License

MIT © [Grigorii Duca](http://greg.md)
