# Ng Facebook

[![npm version](https://badge.fury.io/js/%40greg-md%2Fng-facebook.svg)](https://badge.fury.io/js/%40greg-md%2Fng-facebook)
[![Build Status](https://travis-ci.org/greg-md/ng-facebook.svg?branch=master)](https://travis-ci.org/greg-md/ng-facebook)

Using Facebook SDK with Angular.

# Table of Contents:

* [Features](#features)
* [Installation](#installation)
* [How It Works](#how-it-works)
* [Components](#components)
    * [fb-page](#fb-page) - Page Plugin;
    * [fb-like](#fb-like) - Like Button for the Web.
* [Directives](#directives)
    * [fb-parse](#fb-parse) - Parse facebook plugins.
* [Facebook Service](#facebook-service)
* [License](#license)
* [Huuuge Quote](#huuuge-quote)

# Features

1. Multi-Language initialization support with changing languages in real time;
2. Lazy loading Facebook plugins when they appears in viewport.

# Installation

```bash
npm install @greg-md/ng-facebook --save
```

# How It Works

## Setting up in a module

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// 1. Import Facebook module;
import { FacebookModule } from '@greg-md/ng-facebook';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    // 2. Register Facebook providers in root module;
    FacebookModule.forRoot(),
    
    // 3. Import Facebook components for a specific module.
    FacebookModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Using in components/views

```typescript
import { Component, OnInit } from '@angular/core';
import { FacebookService } from '@greg-md/ng-facebook';

@Component({
  selector: 'app-root',
  template: `
    <a tabindex="0" (click)="changeLanguage('en_EN')">English</a>
    |
    <a tabindex="0" (click)="changeLanguage('ro_RO')">Romanian</a>

    <fb-like href="http://greg.md"></fb-like>
  `,
})
export class AppComponent implements OnInit {
  constructor(public facebook: FacebookService) { }

  ngOnInit() {
    this.facebook.init().subscribe();
  }
  
  changeLanguage(newLanguage) {
    this.facebook.init({}, newLanguage).subscribe();
  }
}
```

# Components

All components have next attributes:

#### lazyLoad

By default plugins are loaded when Facebook SDK is initialized.
If you want plugins to be lazy loaded, use `lazyLoad` attribute.
Setting `lazyLoad` to `200` causes image to load 200 pixels before it appears on viewport.

You can also define lazy loading threshold globally providing `FB_PARSE_LAZY_LOAD` token in module providers.

```typescript
{
  provide: FB_PARSE_LAZY_LOAD,
  useValue: 200,
}
```

#### container

You can use also use `lazyLoad` attribute inside a scrolling container, such as div with scroll bar.

_Example:_

```html
<div #container>
  <fb-page href="https://www.facebook.com/facebook" lazyLoad="200" [container]="container"></fb-page>
</div>
```

## fb-page

Page Plugin.

[Facebook Documentation](https://developers.facebook.com/docs/plugins/page-plugin).

_Example:_

```html
<fb-page href="https://www.facebook.com/facebook">Facebook</fb-page>
```

### Attributes

#### href

The URL of the Facebook Page.

#### width

The pixel width of the plugin. Min. is `180` & Max. is `500`.

Default: `340`.

#### height

The pixel height of the plugin. Min. is `70`.

Default: `500`.

#### tabs

Tabs to render i.e. `timeline`, `events`, `messages`.
Use a comma-separated list to add multiple tabs, i.e. `timeline, events`.

Default: `timeline`.

#### hideCover

Hide cover photo in the header.

Default `false`.

#### showFacepile

Show profile photos when friends like this.

Default `true`.

#### hideCta

Hide the custom call to action button (if available).

Default `false`.

#### smallHeader

Use the small header instead.

Default `false`.

#### adaptContainerWidth

Try to fit inside the container width.

Default `true`.

## fb-like

A single click on the Like button will 'like' pieces of content on the web and share them on Facebook.
You can also display a Share button next to the Like button to let people add a personal message and customize who they share with.

[Facebook Documentation](https://developers.facebook.com/docs/plugins/like-button).

_Example:_

```html
<fb-like href="http://greg.md"></fb-like>
```

### Attributes

#### action

The verb to display on the button. Can be either `like` or `recommend`.

Default: `like`.

#### colorscheme

The color scheme used by the plugin for any text outside of the button itself. Can be `light` or `dark`.

Default: `light`.

#### href

The absolute URL of the page that will be liked.

#### kidDirectedSite

If your web site or online service, or a portion of your service,
is directed to children under 13 [you must enable this](https://developers.facebook.com/docs/plugins/restrictions/).

Default: `false`.

#### layout

Selects one of the different layouts that are available for the plugin.
Can be one of `standard`, `button_count`, `button` or `box_count`.

##### Layout Settings

| Layout        | Default Sizes |
| ------------- | ------------- |
| standard      | Minimum width: 225 pixels.<br>Default width: 450 pixels.<br>Height: 35 pixels (without photos) or 80 pixels (with photos).  |
| box_count     | Minimum width: 55 pixels.<br>Default width: 55 pixels.<br>Height: 65 pixels.  |
| button_count  | Minimum width: 90 pixels.<br>Default width: 90 pixels.<br>Height: 20 pixels.  |
| button        | Minimum width: 47 pixels.<br>Default width: 47 pixels.<br>Height: 20 pixels.  |

#### ref

A label for tracking referrals which must be less than 50 characters
and can contain alphanumeric characters and some punctuation (currently +/=-.:_).
See the [FAQ](https://developers.facebook.com/docs/plugins/faqs#ref) for more details.

#### share

Specifies whether to include a share button beside the Like button. This only works with the XFBML version.

Default: `false`.

#### showFaces

Specifies whether to display profile photos below the button (standard layout only).
You must not enable this on [child-directed sites](https://developers.facebook.com/docs/plugins/restrictions/).

Default: `false`.

### size

The button is offered in 2 sizes i.e. `large` and `small`.

Default: `small`.

#### width

The width of the plugin (standard layout only),
which is subject to the minimum and default width.
Please see [Layout Settings](#layout-settings) for more details.

# Directives

All directives have next attributes:

#### lazyLoad

By default plugins are loaded when Facebook SDK is initialized.
If you want plugins to be lazy loaded, use `lazyLoad` attribute.
Setting `lazyLoad` to `200` causes image to load 200 pixels before it appears on viewport.

#### container

You can use also use `lazyLoad` attribute inside a scrolling container, such as div with scroll bar.

_Example:_

```html
<div #container>
    <div fb-parse lazyLoad="200" [container]="container">
      <div class="fb-like"
        data-href="http://greg.md"
        data-layout="standard"
        data-action="like"
        data-size="small"
        data-showFaces="true"
        data-share="true"></div>
    </div>
</div>
```

## fb-parse

Parse Facebook plugins from current container.

_Example:_

```html
<div fb-parse>
  <div class="fb-like"
    data-href="http://greg.md"
    data-layout="standard"
    data-action="like"
    data-size="small"
    data-showFaces="true"
    data-share="true"></div>
</div>
```

# Facebook Service

`FacebookService` works directly with Facebook sdk.

## Methods

Below is a list of **supported methods**:

* [load](#load) - Load Facebook SDK;
* [init](#init) - Load and initialize Facebook SDK;
* [login](#login) - Login via Facebook;
* [api](#api) - Facebook API;
* [parse](#parse) - Parse Facebook plugins from a HTMLElement;
* [reloadRenderedElements](#reloadRenderedElements) - Reload all rendered elements from DOM;

## load

Load Facebook SDK.

```typescript
load(locale: string = 'en_US'): Observable<Facebook>
```

`lang` - Facebook SDK locale. See [Localization & Translation](https://developers.facebook.com/docs/internationalization).

_Example:_

```typescript
import { Component, OnInit } from '@angular/core';

import { FacebookService } from '@greg-md/ng-facebook';

@Component({
  selector: 'app',
  template: `
    <fb-page href="https://www.facebook.com/facebook"></fb-page>
  `,
})
export class AppComponent implements OnInit {
  constructor(private facebookService: FacebookService) { }

  ngOnInit() {
    this.facebookService.load().subscribe(sdk => {
      // do something
    });
  }
}
```

## init

Load and initialize Facebook SDK.

This method extends the `load` method, by initializing the Facebook SDK in the meantime.

```typescript
init(params: FacebookInitParams = {}, locale: string = 'en_US'): Observable<Facebook>
```

`params` - The same as [FB.init(params)](https://developers.facebook.com/docs/javascript/reference/FB.init/v2.8) parameters;  
`lang` - Facebook SDK locale. See [Localization & Translation](https://developers.facebook.com/docs/internationalization).

_Example:_

```typescript
import { Component, OnInit } from '@angular/core';

import { FacebookService } from '@greg-md/ng-facebook';

@Component({
  selector: 'app',
  template: `
    <button type="button" (click)="changeLocale()">Change Locale</button>
    
    <fb-page href="https://www.facebook.com/facebook"></fb-page>
  `,
})
export class AppComponent implements OnInit {
  settings = {
    appId : '{your-app-id}',
    version: 'v2.7',
  };

  constructor(private facebookService: FacebookService) { }

  ngOnInit() {
    this.facebookService.init(this.settings).subscribe();
  }

  changeLocale() {
    return this.facebookService.init(this.settings, 'ro_RO').subscribe();
  }
}
```

## login

Facebook Login.

```typescript
login(options?: FacebookLoginOptions): Observable<FacebookAuth>
```

_Example:_

```typescript
import { Component, OnInit } from '@angular/core';

import { FacebookService } from '@greg-md/ng-facebook';

@Component({
  selector: 'app',
  template: `
    <button type="button" (click)="loginViaFacebook()">Login via Facebook</button>
    
    <p *ngIf="userID">User ID: {{ userID }}</p>
  `,
})
export class AppComponent implements OnInit {
  settings = {
    appId : '{your-app-id}',
    version: 'v2.7',
  };

  userID: string;

  constructor(private facebookService: FacebookService) { }

  ngOnInit() {
    this.facebookService.init(this.settings).subscribe();
  }

  loginViaFacebook() {
    this.facebookService.login({scope: 'email'}).subscribe(auth => {
      this.userID = auth.userID;
    });
  }
}
```

## api

Facebook API.

```typescript
api(path: string, method?: 'get' | 'post' | 'delete' | FacebookApiParamsArg, params?: FacebookApiParamsArg): Observable<Object>
```

_Example:_

```typescript
import { Component, OnInit } from '@angular/core';

import { FacebookService } from '@greg-md/ng-facebook';

@Component({
  selector: 'app',
  template: `
    <button type="button" (click)="getFacebookName()">Get Facebook Name</button>
    
    <p *ngIf="name">Name: {{ name }}</p>
  `,
})
export class AppComponent implements OnInit {
  settings = {
    appId : '{your-app-id}',
    version: 'v2.7',
  };

  name: string;

  constructor(private facebookService: FacebookService) { }

  ngOnInit() {
    this.facebookService.init(this.settings).subscribe();
  }

  getFacebookName() {
    this.facebookService.api('/me').subscribe(me => {
      this.name = me.name;
    });
  }
}
```

## parse

Parse Facebook plugins from a HTMLElement.

```typescript
parse(element: HTMLElement): Observable<HTMLElement>
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
      data-hideCover="false"
      data-showFacepile="false" 
      data-show-posts="false"></div>
  `,
})
export class FacebookPageComponent implements OnInit {
  constructor(private: elementRef: ElementRef, private facebookService: FacebookService) { }

  ngOnInit() {
    this.facebookService.parse(this.elementRef.nativeElement).subscribe();
  }
}
```

## reloadRenderedElements

Reload all Facebook rendered elements from DOM.

```typescript
reloadRenderedElements(): Observable<HTMLElement>
```

_Example:_

```typescript
import { Component, OnInit } from '@angular/core';

import { FacebookService } from '@greg-md/ng-facebook';

@Component({
  selector: 'app',
  template: `
    <button type="button" (click)="changeLocale()">Change Locale</button>
    
    <fb-page href="https://www.facebook.com/facebook"></fb-page>
  `,
})
export class AppComponent implements OnInit {
  constructor(private facebookService: FacebookService) { }

  ngOnInit() {
    this.facebookService.load().subscribe();
  }

  changeLocale() {
    this.facebookService.load('ro_RO').subscribe(sdk => {
      this.facebookService.reloadRenderedElements().subscribe();
    });
  }
}
```

# License

MIT © [Grigorii Duca](http://greg.md)

# Huuuge Quote

![I fear not the man who has practiced 10,000 programming languages once, but I fear the man who has practiced one programming language 10,000 times. #horrorsquad](http://greg.md/huuuge-quote-fb.jpg)
